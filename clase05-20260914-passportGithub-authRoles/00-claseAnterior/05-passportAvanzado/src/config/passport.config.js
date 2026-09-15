import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import bcrypt from "bcrypt"

import { UsersDAO } from "../dao/UsersDAO.js"

const usersDAO=new UsersDAO()

const buscaToken=req=>{
    let token=null

    if(req.cookies.cookietoken){
        token=req.cookies.cookietoken
    }

    return token
}

export const inicializarPassport=()=>{

    // paso 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscaToken, ])
        }, 
        async(payload, done)=>{   // payload=user
            try {
                // return done(null, user)
                // return done(null, false)   // password incorrecto o fallo de validacion (no error)

                return done(null, payload)
                
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email", 
            // passwordField: "clave",
            // passReqToCallback: true, 
        }, 
        async(username, password, done)=>{
            try {
                let user=await usersDAO.getBy({email: username})
                console.log(user)
                if(!user){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false, {message: "Credenciales inválidas"})
                }
                
                if(!bcrypt.compareSync(password, user.password)){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
        
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("registro", new local.Strategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async(req, username, password, done)=>{
            try {
                let {firstName, lastName}=req.body
                if(!firstName || !lastName){
                    return done(null, false, {message: "firstName | lastName son requeridos"})
                }

                let existe=await usersDAO.getBy({email: username})
                if(existe){
                    return done(null, false, {message: `El email ${username} ya existe en DB`})
                }

                // resto validaciones pertinentes
                let user=await usersDAO.create({firstName, lastName, email: username, password: bcrypt.hashSync(password, 10)})
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))


    // paso 1'   // solo aplica si usamos sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}