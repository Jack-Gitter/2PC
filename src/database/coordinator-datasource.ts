import { DataSource } from "typeorm";
import { configDotenv } from "dotenv";
import { DB_1, ENV, } from "../enums";
import { CoordinatorLog } from "./entities/coordinator-log.entity";

configDotenv()

export const coordinatorDatasource = new DataSource({
	type: 'postgres',
	host: process.env[ENV.DB_HOST],
	port: Number(process.env[ENV.DB_PORT]),
	username: process.env[DB_1.DB_USERNAME],
	password: process.env[DB_1.DB_PASSWORD],
	database: process.env[DB_1.DB_NAME],
	entities: [CoordinatorLog],
	migrations: []
})


