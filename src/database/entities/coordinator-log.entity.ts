import { Column, Entity } from "typeorm";


@Entity()
export class coordinator_log {

	@Column()
	dbName1: string

	@Column()
	dbName2: string


}
