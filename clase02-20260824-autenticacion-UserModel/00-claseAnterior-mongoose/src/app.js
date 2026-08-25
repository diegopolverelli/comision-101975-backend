import express from 'express';
import { router as productsRouter } from './routes/productsRouter.js';
import { logger } from './middlewares/log.js';
import { config } from './config/config.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connDB } from './config/db.js';


// const PORT=3000;
const PORT=config.general.PORT;


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(logger)

app.use("/api/products", productsRouter)

app.get('/', (req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK...!!!');
})



app.get('/test', logger, (req,res)=>{

    if(req.query.error){
        throw new Error("Error de pruebas...!!!")
    }


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('test OK...!!!');
})

app.use(errorHandler)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


connDB(config.database.MONGO_URL, config.database.DB_NAME)