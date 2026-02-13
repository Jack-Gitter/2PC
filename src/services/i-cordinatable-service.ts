import {UUID} from 'crypto'

export interface ICoordinatableService {
	// this function should be idempotent (check if the tx already exists or not before creating)
	prepare(txid: UUID): Promise<boolean>
	// this function should be idempotent (check if the tx already exists or not before committing)
	commit(txid: UUID)
	// this function should be idempotent (check if the tx already exists or not before rolling back)
	rollback(txid: UUID)
}
