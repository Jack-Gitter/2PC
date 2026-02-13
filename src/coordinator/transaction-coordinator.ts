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

		// PHASE 1
		const personResponse = await this.personsService.prepare(txId)
		const addressResponse = await this.addressService.prepare(txId)

		// WAL
		log.status1 = personResponse ? STATUS.SUCCESS : STATUS.FAILURE
		log.status2 = addressResponse ? STATUS.SUCCESS : STATUS.FAILURE
		await this.coordinatorRepository.save(log)

		// PHASE 2
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
	}

	// keep retrying here if we get a connection error. If we get an error that no txid exists, then stop. If we get any other error, that is bad
	async commit(txid: UUID) {
		await this.personsService.commit(txid)
		await this.addressService.commit(txid)
	}

	recover() {
		// load transactions from db, create prepared transactions if no status, and commit/rollback as necessary if status exists
	}
}
