import {UUID} from 'crypto'

export interface ICoordinatableService {
	// this function should be idempotent (check if the tx already exists or not before creating)
	prepare(txid: UUID): Promise<boolean>
	commit(txid: UUID)
	rollback(txid: UUID)
}
