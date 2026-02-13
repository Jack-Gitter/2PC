import { Column, Entity } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { STATUS } from "../enums";


@Entity('coordinator_logs')
export class CoordinatorLog {

	@Column({type: 'enum', enum: STATUS, nullable: true})
	status1: STATUS

	@Column({type: 'enum', enum: STATUS, nullable: true})
	status2: STATUS

	@Column({type: 'uuid'})
	transactionId: UUID

}
