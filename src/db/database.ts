import { DataSource } from "typeorm";
import { config } from "../config/config";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.dbHost,
    port: 5432,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    logging: true,
    synchronize: config.dbSynchronise,
    entities: ["src/db/models/*.ts"]
})
