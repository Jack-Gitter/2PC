
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('persons')
export class Person {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	firstname: string

	@Column()
	lastname: string

	@Column()
	age: number
}
