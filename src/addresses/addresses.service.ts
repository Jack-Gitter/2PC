import { ICordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";
import {UUID} from 'crypto'

export class AddressesService implements ICordinatableService {

	constructor(private datasource: DataSource) {}

    prepare(txid: UUID): boolean {
        throw new Error("Method not implemented.");
    }
    commit(txid: UUID) {
        throw new Error("Method not implemented.");
    }
    rollback(txid: UUID) {
        throw new Error("Method not implemented.");
    }
}
