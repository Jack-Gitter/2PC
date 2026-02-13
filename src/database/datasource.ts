import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";
import { DB_1, DB_2, DB_3, ENV } from "../enums";
import { CoordinatorLog } from "./entities/coordinator-log.entity";

configDotenv()

export const datasource1 = new DataSource({
	type: 'postgres',
	host: process.env[ENV.DB_HOST],
	port: Number(process.env[ENV.DB_PORT]),
	username: process.env[DB_1.DB_USERNAME],
	password: process.env[DB_1.DB_PASSWORD],
	database: process.env[DB_1.DB_NAME],
	entities: [CoordinatorLog],
	migrations: []
})

export const datasource2 = new DataSource({
	type: 'postgres',
	host: process.env[ENV.DB_HOST],
	port: Number(process.env[ENV.DB_PORT]),
	username: process.env[DB_2.DB_USERNAME],
	password: process.env[DB_2.DB_PASSWORD],
	database: process.env[DB_2.DB_NAME],
	migrations: []
})


export const datasource3 = new DataSource({
	type: 'postgres',
	host: process.env[ENV.DB_HOST],
	port: Number(process.env[ENV.DB_PORT]),
	username: process.env[DB_3.DB_USERNAME],
	password: process.env[DB_3.DB_PASSWORD],
	database: process.env[DB_3.DB_NAME],
	migrations: []
})
