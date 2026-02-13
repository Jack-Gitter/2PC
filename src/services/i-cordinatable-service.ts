import {UUID} from 'crypto'

export interface ICordinatableService {
	prepare(txid: UUID): Promise<boolean>
	commit(txid: UUID)
	rollback(txid: UUID)
}
