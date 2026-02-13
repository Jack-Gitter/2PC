import { ICordinatableService } from "src/services/i-cordinatable-service";

export class TransactionCoordinator {
	constructor(private personsService: ICordinatableService, private addressService: ICordinatableService) {}

	begin() {}

	rollback() {}

	commit() {}
}
