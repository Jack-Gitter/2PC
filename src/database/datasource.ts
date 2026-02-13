import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";
import { DB_1, DB_2, DB_3, ENV } from "../enums";

configDotenv()

export const datasource1 = new DataSource({
	type: 'postgres',
	host: process.env[ENV.HOST],
	port: Number(process.env[ENV.PORT]),
	username: process.env[DB_1.USERNAME],
	password: process.env[DB_1.PASSWORD],
	database: process.env[DB_1.NAME],
	migrations: []
})

export const datasource2 = new DataSource({
	type: 'postgres',
	host: process.env[ENV.HOST],
	port: Number(process.env[ENV.PORT]),
	username: process.env[DB_2.USERNAME],
	password: process.env[DB_2.PASSWORD],
	database: process.env[DB_2.NAME],
	migrations: []
})


export const datasource3 = new DataSource({
	type: 'postgres',
	host: process.env[ENV.HOST],
	port: Number(process.env[ENV.PORT]),
	username: process.env[DB_3.USERNAME],
	password: process.env[DB_3.PASSWORD],
	database: process.env[DB_3.NAME],
	migrations: []
})
