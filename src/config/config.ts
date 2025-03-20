import dotenv from 'dotenv';

dotenv.config();

export interface Configuration {
    dbName: string;
    dbPassword: string;
    dbUser: string;
    dbSynchronise: boolean;
    dbHost: string;
}

const initConfig = (): Configuration => {
    const {
        DB_NAME,
        DB_PASSWORD,
        DB_USER,
        DB_SYNCHRONISE,
        DB_HOST
    } = process.env;

    if (!DB_NAME || !DB_PASSWORD || !DB_SYNCHRONISE || !DB_USER || !DB_HOST) {
        throw new Error("Missing environment variables");
    }

    return {
        dbName: DB_NAME,
        dbPassword: DB_PASSWORD,
        dbUser: DB_USER,
        dbSynchronise: DB_SYNCHRONISE.toLowerCase() === "true",
        dbHost: DB_HOST,
    };
};

export const config: Readonly<Configuration> = initConfig();