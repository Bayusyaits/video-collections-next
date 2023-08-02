import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./services/user/entity"
import { Category } from "./services/category/entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password8",
    database: "db_library",
    synchronize: true,
    logging: false,
    entities: [User, Category],
    migrations: [],
    subscribers: [],
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))