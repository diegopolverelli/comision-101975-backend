import express from 'express';
import { connDB } from './config/db.js';
import { config } from './config/config.js';

import { router as sessionsRouter } from './routes/sessionsRouter.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/sessions", sessionsRouter)

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

connDB(config.database.MONGO_URL, config.database.DB_NAME)