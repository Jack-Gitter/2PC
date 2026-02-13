import { DataSource } from "typeorm";
import { Address } from "./entities/address.entity";
import { DB_3, ENV } from "src/enums";
import { configDotenv } from "dotenv";
import { Addresses1771006423217 } from "./migrations/1771006423217-addresses";

configDotenv()

export const addressDatasource = new DataSource({
	type: 'postgres',
	host: process.env[ENV.DB_HOST],
	port: Number(process.env[ENV.DB_PORT]),
	username: process.env[DB_3.DB_USERNAME],
	password: process.env[DB_3.DB_PASSWORD],
	database: process.env[DB_3.DB_NAME],
	entities: [Address],
	migrations: [Addresses1771006423217]
})
