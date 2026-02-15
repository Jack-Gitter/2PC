import { CoordinatorLog } from "../database/entities/coordinator-log.entity";
import { Not, Repository } from "typeorm";
import { randomUUID, UUID } from 'crypto'
import { STATUS } from "../database/enums";
import { ICoordinatableService } from "../services/i-cordinatable-service";
import { backOff } from "exponential-backoff";

export class TransactionCoordinator {
	constructor(private personsService: ICoordinatableService, private addressService: ICoordinatableService, private coordinatorRepository: Repository<CoordinatorLog>) {}

	async begin() {
		const txId = randomUUID()
		const log = new CoordinatorLog(txId)
		await this.coordinatorRepository.save(log)

		await this.phase1(log)
		// await this.phase2(log)
	}

	private async phase1(log: CoordinatorLog) {
		let personResponse = false
		let addressResponse = false

		try {
			personResponse = await this.personsService.prepare(log.transactionId)
		} catch (e) {
			console.log(`Failed to prepare transaction with id ${log.transactionId} for person`)
		}

		// try {
		// 	addressResponse = await this.addressService.prepare(log.transactionId)
		// } catch (e) {
		// 	console.log(`Failed to prepare transaction with id ${log.transactionId} for address`)
		// }
		//
		// log.status = personResponse && addressResponse ? STATUS.COMMIT : STATUS.ROLLBACK
		// await this.coordinatorRepository.save(log)

	}

	private async phase2(log: CoordinatorLog) {
		if (log.status === STATUS.COMMIT) {
			await this.commit(log.transactionId)
		} else {
			await this.rollback(log.transactionId)
		}
		await this.coordinatorRepository.update({transactionId: log.transactionId}, {status: STATUS.DONE});
	}

	async rollback(txid: UUID) {
		await backOff(() => this.personsService.rollback(txid))
		await backOff(() => this.addressService.rollback(txid))
	}

	async commit(txid: UUID) {
		await backOff(() => this.personsService.commit(txid))
		await backOff(() => this.addressService.commit(txid))
	}

	async recover() {
		const incompleteTxs = await this.coordinatorRepository.find({
			where: { status: Not(STATUS.DONE) }
		})
		
		for (const log of incompleteTxs) {
			try {
				if (!log.status) {
					await this.phase1(log)
				}
				await this.phase2(log)
				
			} catch (error) {
				console.error(`Recovery failed for transaction ${log.transactionId}:`, error)
			}
		}
	}
}
