import Pool from "pg-pool";

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    password: 'postgres',
    user: 'postgres',
    database: 'test'
})

const pool2 = new Pool({
    host: 'localhost',
    port: 5434,
    password: 'postgres',
    user: 'postgres',
    database: 'test'
})

pool.query(
  `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "user" character varying NOT NULL, "money" integer NOT NULL, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
);
pool2.query(
  `CREATE TABLE "invoices" ("id" SERIAL NOT NULL, "user" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
);
