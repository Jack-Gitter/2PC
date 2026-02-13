export interface ICordinatableService {
	prepare(): boolean
	commit()
	rollback()
}
