import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./services/user/entity"
import { Category } from "./services/category/entity"
import { Video } from "./services/video/entity"
import { Collection } from "./services/collection/entity"
import { VideoCollection } from "./services/video-collection/entity"
import { VideoCategory } from "./services/video-category/entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "Password8",
    database: "db_collections",
    synchronize: true,
    logging: false,
    entities: [
        User, 
        Category, 
        Video, 
        Collection, 
        VideoCollection,
        VideoCategory
    ],
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