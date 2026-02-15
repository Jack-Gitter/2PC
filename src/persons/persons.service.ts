import { ICoordinatableService } from "src/services/i-cordinatable-service";
import { DataSource } from "typeorm";
import {UUID} from 'crypto'

export class PersonsService implements ICoordinatableService {

	constructor(private datasource: DataSource) {}

    async prepare(txid: UUID): Promise<boolean> {

		const txExists = await this.txExists(txid)

		if (txExists) {
			return true
		}

		try {
			const query = ` BEGIN TRANSACTION; UPDATE PERSONS SET FIRSTNAME = 'New Firstname' WHERE id = 1; PREPARE TRANSACTION '${txid}'; `
			await this.datasource.query(query)
			return true
		} catch (e) {
			console.log(e.message)
			return false
		}

    }

    async commit(txid: UUID) {

		const txExists = await this.txExists(txid)

		if (!txExists) {
			return true
		}
		
		const query = `COMMIT PREPARED '${txid}'`

		await this.datasource.query(query)
		
		return true
    }

    async rollback(txid: UUID) {
		const txExists = await this.txExists(txid)
		
		if (!txExists) {
			return true
		}
		
		const query = `ROLLBACK PREPARED '${txid}'`

		await this.datasource.query(query)

		return true
    }

	private async txExists(txid: UUID) {

		const query = `
			SELECT EXISTS (
			  SELECT 1
			  FROM pg_prepared_xacts
			  WHERE gid = '${txid}'
			);
		`

		const result = await this.datasource.query(query)

		return result[0].exists
	}
}
