import { Column, Entity } from "typeorm";
import { STATUS } from "../enums";
import { UUID } from 'crypto'

@Entity('coordinator_logs')
export class CoordinatorLog {

	constructor(transactionId: UUID, status?: STATUS) {
		this.transactionId = transactionId
		this.status = status
	}

	@Column({type: 'enum', enum: STATUS, nullable: true})
	status: STATUS | null

	@Column({type: 'uuid', primary: true})
	transactionId: UUID
}
