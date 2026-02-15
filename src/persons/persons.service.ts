import { ICoordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";
import {UUID} from 'crypto'

export class PersonsService implements ICoordinatableService {

	constructor(private datasource: DataSource) {}

    async prepare(txid: UUID): Promise<boolean> {

		const txExists = await this.txExists(txid)
		
		// if txExists, return true

		const query = `
		BEGIN TRANSACTION;

		UPDATE 
			PERSONS 
		SET 
			FIRSTNAME = 'New Firstname' 
		WHERE 
			id = 1;

		PREPARE TRANSACTION '$1';
		`

		const result = await this.datasource.query(query, [txid])

		console.log(result)

		return false
    }

    async commit(txid: UUID) {

		const txExists = await this.txExists(txid)
		
		// if it doesnt exist, return true

		const query = `COMMIT PREPARED '$1'`

		const result = await this.datasource.query(query, [txid])

		console.log(result)

		return result

    }
	// make this idemptontent, look for txid before doing any action
    async rollback(txid: UUID) {
		const txExists = await this.txExists(txid)
		
		// return true if tx does not exist
		
		const query = `ROLLBACK PREPARED '$1'`

		const result = await this.datasource.query(query, [txid])

		console.log(result)

		return result

    }

	private async txExists(txid: UUID) {

		const query = `
			SELECT EXISTS (
			  SELECT 1
			  FROM pg_prepared_xacts
			  WHERE gid = '$1'
			);
		`

		const result = await this.datasource.query(query, [txid])

		console.log(result)

		return result

	}
}
