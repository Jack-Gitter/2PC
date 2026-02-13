import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('addresses')
export class Address {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	city: string

	@Column()
	state: string

	@Column()
	zip: string
}
