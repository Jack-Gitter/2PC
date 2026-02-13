import { ICordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";

export class PersonsService implements ICordinatableService {

	constructor(private datasource: DataSource) {}

    prepare(): boolean {
        throw new Error("Method not implemented.");
    }
    commit() {
        throw new Error("Method not implemented.");
    }
    rollback() {
        throw new Error("Method not implemented.");
    }
}
