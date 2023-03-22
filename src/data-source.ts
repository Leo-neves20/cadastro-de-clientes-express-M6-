import path from "path";
import "dotenv/config"
import "reflect-metadata"
import "pg"
import { DataSource ,DataSourceOptions } from "typeorm";

const setDataSourceConfig = (): DataSourceOptions => {

    const node_env = process.env.NODE_ENV
    const entities = [path.join(__dirname, "./entities/**.{js,ts}")]
    const migrations = [path.join(__dirname, "./migrations/**.{js,ts}")]

    if(node_env == "production"){
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities,
            migrations
        }
    }

    return {
        type: "postgres",
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        synchronize: false,
        logging: true,
        entities,
        migrations
    }

}

const dataSettings = setDataSourceConfig()
const appDataSource = new DataSource(dataSettings)

export default appDataSource
