import { ICoordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";
import {UUID} from 'crypto'

export class PersonsService implements ICoordinatableService {

	constructor(private datasource: DataSource) {}

    async prepare(txid: UUID): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    commit(txid: UUID) {
        throw new Error("Method not implemented.");
    }
    rollback(txid: UUID) {
        throw new Error("Method not implemented.");
    }
}
