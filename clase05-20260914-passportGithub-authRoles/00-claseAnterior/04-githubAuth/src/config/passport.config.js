import passport from "passport";
import github from "passport-github2"
import { usuariosModelo } from "../models/usuario.model.js";

export const initPassport=()=>{

    passport.use("github", new github.Strategy(
        {
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub", 
            clientSecret: "ef9f46855cfe89b23e503949b893c623693d4086", 
            clientID: "Iv23livfwvrZ5DgRUcZ9",
        }, 
        async(t1, t2, profile, done)=>{
            try {
                // console.log(profile)
                // return done(null, {id:1, name:"Mariana"})
                let {email, name}=profile._json
                if(!email){
                    return done(null, false)
                }
                let user=await usuariosModelo.findOne({email})
                if(!user){
                    user=await usuariosModelo.create({nombre: name, email})
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))



}