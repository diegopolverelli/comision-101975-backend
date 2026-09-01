import express from 'express';
import { connDB } from './config/db.js';
import { config } from './config/config.js';
import sessions from "express-session"

// import FileStorage from "session-file-store"
import MongoStorage from "connect-mongo"

import { router as productsRouter } from './routes/productsRouter.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
const PORT=3000;

const app=express();

// const fileStore=FileStorage(sessions)

app.use(express.static("./public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(sessions({
    secret: config.general.SECRET, 
    saveUninitialized: false, 
    resave: false, 
    // store: new fileStore({
    //     path: "./src/sessions", 
    //     ttl: 3600, 
    //     retries: 0
    // }),
    store: MongoStorage.create({
        mongoUrl: config.database.MONGO_URL, 
        dbName: config.database.DB_NAME, 
        // collectionName: "sessions",
        ttl: 3600, 
    })
}))

app.use("/api/products", productsRouter)
app.use("/api/sessions", sessionsRouter)

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

connDB(config.database.MONGO_URL, config.database.DB_NAME)