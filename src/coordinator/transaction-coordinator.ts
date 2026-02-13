import { CoordinatorLog } from "src/database/entities/coordinator-log.entity";
import { Repository } from "typeorm";
import { randomUUID, UUID } from 'crypto'
import { STATUS } from "src/database/enums";
import { ICoordinatableService } from "src/services/i-cordinatable-service";

export class TransactionCoordinator {
	constructor(private personsService: ICoordinatableService, private addressService: ICoordinatableService, private coordinatorRepository: Repository<CoordinatorLog>) {}

	async begin() {
		// WAL
		const txId = randomUUID()
		const log = new CoordinatorLog(txId)
		await this.coordinatorRepository.save(log)

		const { personResponse, addressResponse } = await this.phase1(txId)

		// WAL
		log.status1 = personResponse ? STATUS.SUCCESS : STATUS.FAILURE
		log.status2 = addressResponse ? STATUS.SUCCESS : STATUS.FAILURE
		await this.coordinatorRepository.save(log)

		await this.phase2(txId, personResponse, addressResponse)
	}

	private async phase1(txId: UUID): Promise<{personResponse: boolean, addressResponse: boolean}> {
		const personResponse = await this.personsService.prepare(txId)
		const addressResponse = await this.addressService.prepare(txId)
		return {personResponse, addressResponse}
	}

	private async phase2(txId: UUID, personResponse: boolean, addressResponse: boolean) {
		if (personResponse && addressResponse) {
			await this.commit(txId)
		} else {
			await this.rollback(txId)
		}
	}

	// keep trying here if we can a connection error. If we get an error that no txid exists, then stop. If we get any other error, that is bad
	async rollback(txid: UUID) {
		await this.personsService.rollback(txid)
		await this.addressService.rollback(txid)
		await this.coordinatorRepository.delete({ transactionId: txid });
	}

	// keep retrying here if we get a connection error. If we get an error that no txid exists, then stop. If we get any other error, that is bad
	async commit(txid: UUID) {
		await this.personsService.commit(txid)
		await this.addressService.commit(txid)
		await this.coordinatorRepository.delete({ transactionId: txid });
	}

	async recover() {
		const incompleteTxs = await this.coordinatorRepository.find();

		for (const log of incompleteTxs) {
			try {
				const phase1Completed = log.status1 && log.status2
				
				if (phase1Completed) {
					const personSuccess = log.status1 === STATUS.SUCCESS;
					const addressSuccess = log.status2 === STATUS.SUCCESS;
					
					await this.phase2(log.transactionId, personSuccess, addressSuccess);
					
				} else {
					const { personResponse, addressResponse } = await this.phase1(log.transactionId);
					
					log.status1 = personResponse ? STATUS.SUCCESS : STATUS.FAILURE;
					log.status2 = addressResponse ? STATUS.SUCCESS : STATUS.FAILURE;
					await this.coordinatorRepository.save(log);
					
					await this.phase2(log.transactionId, personResponse, addressResponse);
				}
			} catch (error) {
				console.error(`Failed to recover transaction ${log.transactionId}:`, error);
			}
		}
	}
}
