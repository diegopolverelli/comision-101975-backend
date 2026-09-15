import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser"
import passport from 'passport';
import { inicializarPassport } from './config/passport.config.js';
import bcrypt from "bcrypt"

import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { auth } from './middlewares/auth.js';
import { logger } from './middlewares/logger.js';
import { userModel } from './dao/models/userModel.js';
// import { log } from 'console';

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// paso 2
app.use(passport.initialize())
// app.use(passport.session())  // solo si usamos sessions
inicializarPassport()
app.use(cookieParser())

app.use(express.static("./public"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

app.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar...!!!`})
})

app.get("/logout", (req, res)=>{

    res.clearCookie("cookietoken")
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logout exitoso"});
})

app.get(
    "/datos1", 
    passport.authenticate("current", {session: false, failureRedirect: "/error"}), 
    auth("admin", "manager"), 
    (req, res)=>{

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"datos 1"});
    }
)

app.get(
    "/datos2", 
    passport.authenticate("current", {session: false, failureRedirect: "/error"}), 
    auth("user", "manager"), 
    (req, res)=>{

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"datos 2"});
    }
)


// app.get("/pruebas", auth, (req, res)=>{
app.get(
    "/pruebas", 
    // auth, 
    logger, 
    passport.authenticate("current", {session: false, failureRedirect: "/error"}),
    auth("user", "admin", "manager"), 
    (req, res)=>{
        console.log(req.headers)
        console.log(req.cookies)

        // si passport.authenticate sale OK dejando un user, en la req
        // req.user

        // res.cookie("prueba", 123, {httpOnly: true})
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Datos de prueba", user: req.user.firstName});
    }
)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect("mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comisPruebas")
        console.log(`Conexión a DB establecida`)
        let user=await userModel.findOne({email:"admin@test.com"})
        if(!user){
            user=await userModel.create({firstName:"root", lastName:"root", email:"admin@test.com", "password": bcrypt.hashSync("123", 10), role: "admin"})
        }
        console.log(user)

    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();
