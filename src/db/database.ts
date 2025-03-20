import { DataSource } from "typeorm";
import { config } from "../config/config";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    logging: true,
    synchronize: config.dbSynchronise,
    entities: ["dist/db/models/*.js"]
})
