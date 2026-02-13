import { DataSource } from "typeorm";
import { Person } from "./entities/person.entity";
import { DB_2, ENV } from "../enums";
import { configDotenv } from "dotenv";
import { Person1771006413650 } from "./migrations/1771006413650-person";

configDotenv()

export const personDatasource = new DataSource({
	type: 'postgres',
	host: process.env[ENV.DB_HOST],
	port: Number(process.env[ENV.DB_PORT]),
	username: process.env[DB_2.DB_USERNAME],
	password: process.env[DB_2.DB_PASSWORD],
	database: process.env[DB_2.DB_NAME],
	entities: [Person],
	migrations: [Person1771006413650]
})
