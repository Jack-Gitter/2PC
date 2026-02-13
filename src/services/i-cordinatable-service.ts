import {UUID} from 'crypto'

export interface ICoordinatableService {
	prepare(txid: UUID): Promise<boolean>
	commit(txid: UUID)
	rollback(txid: UUID)
}
