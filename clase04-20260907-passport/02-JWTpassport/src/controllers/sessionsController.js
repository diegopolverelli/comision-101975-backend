import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UsersDAO } from "../dao/UsersDAO.js";

let usersDAO=new UsersDAO()

export const login=async(req,res)=>{
    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email | password son requeridos`})
    }

    // resto validaciones pertinentes
    console.log(email, password)

    try {
        let user=await usersDAO.getBy({email})
        console.log(user)
        if(!user){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }
        
        if(!bcrypt.compareSync(password, user.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        let token=jwt.sign(user, "CoderCoder123", {expiresIn:"1h"})
        
        res.cookie("cookietoken", token, {httpOnly: true})
        res.setHeader('Content-Type','application/json')
        // res.status(200).json({message:"Login correcto", user, token})
        res.status(200).json({message:"Login correcto", user, })
    } catch (error) {
        console.log(error)

        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`internal server error`})
    }
    

}