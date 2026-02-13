import { CoordinatorLog } from "src/database/entities/coordinator-log.entity";
import { Repository } from "typeorm";
import { randomUUID, UUID } from 'crypto'
import { STATUS } from "src/database/enums";
import { ICoordinatableService } from "src/services/i-cordinatable-service";
import { backOff } from "exponential-backoff";

export class TransactionCoordinator {
	constructor(private personsService: ICoordinatableService, private addressService: ICoordinatableService, private coordinatorRepository: Repository<CoordinatorLog>) {}

	async begin() {
		// WAL
		const txId = randomUUID()
		const log = new CoordinatorLog(txId)
		await this.coordinatorRepository.save(log)

		const { personResponse, addressResponse } = await this.phase1(txId)

		// WAL
		log.status = personResponse && addressResponse ? STATUS.COMMIT : STATUS.ROLLBACK
		await this.coordinatorRepository.save(log)

		await this.phase2(txId, log.status)
	}

	private async phase1(txId: UUID): Promise<{personResponse: boolean, addressResponse: boolean}> {
		let personResponse = false
		let addressResponse = false

		try {
			const personResponse = await this.personsService.prepare(txId)
		} catch (e) {
			console.log(`Failed to prepare transaction with id ${txId} for person`)
		}

		try {
			const addressResponse = await this.addressService.prepare(txId)
		} catch (e) {
			console.log(`Failed to prepare transaction with id ${txId} for address`)
		}

		return { personResponse, addressResponse }
	}

	private async phase2(txId: UUID, status: STATUS) {
		if (status === STATUS.COMMIT) {
			await this.commit(txId)
		} else {
			await this.rollback(txId)
		}
		await this.coordinatorRepository.update({transactionId: txId}, {status: STATUS.DONE});
	}

	// keep trying here if we can a connection error. If we get an error that no txid exists, then stop. If we get any other error, that is bad
	async rollback(txid: UUID) {
		await backOff(() => this.personsService.rollback(txid))
		await backOff(() => this.addressService.rollback(txid))
	}

	// keep retrying here if we get a connection error. If we get an error that no txid exists, then stop. If we get any other error, that is bad
	async commit(txid: UUID) {
		await backOff(() => this.personsService.commit(txid))
		await backOff(() => this.addressService.commit(txid))
	}

	async recover() {}
}
