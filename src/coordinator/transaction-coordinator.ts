import { ICordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";

export class TransactionCoordinator {
	constructor(private personsService: ICordinatableService, private addressService: ICordinatableService, private coordinatorDatasource: DataSource) {}

	begin() {}

	rollback() {}

	commit() {}

	recover() {}
}
