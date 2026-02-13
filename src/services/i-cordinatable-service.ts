import {UUID} from 'crypto'

export interface ICordinatableService {
	prepare(txid: UUID): boolean
	commit(txid: UUID)
	rollback(txid: UUID)
}
