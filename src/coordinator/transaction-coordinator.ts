import { CoordinatorLog } from "src/database/entities/coordinator-log.entity";
import { Repository } from "typeorm";
import { randomUUID, UUID } from 'crypto'
import { STATUS } from "src/database/enums";
import { ICoordinatableService } from "src/services/i-cordinatable-service";

export class TransactionCoordinator {
	constructor(private personsService: ICoordinatableService, private addressService: ICoordinatableService, private coordinatorRepository: Repository<CoordinatorLog>) {}

	async begin() {
		const txId = randomUUID()
		const log = new CoordinatorLog(txId)
		await this.coordinatorRepository.save(log)
		const personResponse = await this.personsService.prepare(txId)
		const addressResponse = await this.addressService.prepare(txId)
		log.status1 = personResponse ? STATUS.SUCCESS : STATUS.FAILURE
		log.status2 = addressResponse ? STATUS.SUCCESS : STATUS.FAILURE
		await this.coordinatorRepository.save(log)
		if (personResponse && addressResponse) {
			await this.commit(txId)
		} else {
			await this.rollback(txId)
		}
	}

	async rollback(txid: UUID) {}

	async commit(txid: UUID) {}

	recover() {}
}
