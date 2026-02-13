import { CoordinatorLog } from "src/database/entities/coordinator-log.entity";
import { ICordinatableService } from "src/services/i-cordinatable-service";
import { Repository } from "typeorm";
import { randomUUID } from 'crypto'
import { STATUS } from "src/database/enums";

export class TransactionCoordinator {
	constructor(private personsService: ICordinatableService, private addressService: ICordinatableService, private coordinatorRepository: Repository<CoordinatorLog>) {}

	async begin() {
		const txId = randomUUID()
		const log = new CoordinatorLog(txId)
		await this.coordinatorRepository.save(log)
		const personResponse = await this.personsService.prepare(txId)
		const addressResponse = await this.addressService.prepare(txId)
		log.status1 = personResponse ? STATUS.SUCCESS : STATUS.FAILURE
		log.status2 = addressResponse ? STATUS.SUCCESS : STATUS.FAILURE
		await this.coordinatorRepository.save(log)
	}

	rollback() {}

	commit() {}

	recover() {}
}
