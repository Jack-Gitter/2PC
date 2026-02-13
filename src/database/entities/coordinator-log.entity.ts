import { Column, Entity } from "typeorm";
import { STATUS } from "../enums";
import { UUID } from 'crypto'

@Entity('coordinator_logs')
export class CoordinatorLog {

	constructor(transactionId: UUID, status1?: STATUS,  status2?: STATUS) {}

	@Column({type: 'enum', enum: STATUS, nullable: true})
	status1: STATUS | null

	@Column({type: 'enum', enum: STATUS, nullable: true})
	status2: STATUS | null

	@Column({type: 'uuid', primary: true})
	transactionId: UUID
}
