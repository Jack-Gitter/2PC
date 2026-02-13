import { ICoordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";
import {UUID} from 'crypto'

export class AddressesService implements ICoordinatableService {

	constructor(private datasource: DataSource) {}

	// make this idemptontent, look for txid before doing any action
    async prepare(txid: UUID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
	// make this idemptontent, look for txid before doing any action
    commit(txid: UUID) {
        throw new Error("Method not implemented.");
    }
	// make this idemptontent, look for txid before doing any action
    rollback(txid: UUID) {
        throw new Error("Method not implemented.");
    }
}
