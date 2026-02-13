import { CoordinatorLog } from "src/database/entities/coordinator-log.entity";
import { ICordinatableService } from "src/services/i-cordinatable-service";
import { DataSource, Repository } from "typeorm";
import {randomUUID, UUID} from 'crypto'
import { coordinatorDatasource } from "src/database/coordinator-datasource";

export class TransactionCoordinator {
	constructor(private personsService: ICordinatableService, private addressService: ICordinatableService, private coordinatorRepository: Repository<CoordinatorLog>) {}

	async begin() {
		const txId = randomUUID()
		const log = new CoordinatorLog(txId)
		await this.coordinatorRepository.save(log)
		const personResponse = await this.personsService.prepare(txId)
		const addressResponse = await this.addressService.prepare(txId)
		// set log.status1 and log.status2 here
	}

	rollback() {}

	commit() {}

	recover() {}
}
