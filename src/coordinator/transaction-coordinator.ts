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
		log.status = personResponse && addressResponse ? STATUS.COMMIT : STATUS.ROLLBACK
		await this.coordinatorRepository.save(log)

		await this.phase2(txId, log.status)
	}

	private async phase1(txId: UUID): Promise<{personResponse: boolean, addressResponse: boolean}> {
		const personResponse = await this.personsService.prepare(txId)
		const addressResponse = await this.addressService.prepare(txId)
		return {personResponse, addressResponse}
	}

	private async phase2(txId: UUID, status: STATUS) {
		if (status === STATUS.COMMIT) {
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

	async recover() {}
}
