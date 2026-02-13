import { ICordinatableService } from "src/services/i-cordinatable-service";

export class AddressesService implements ICordinatableService {
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
