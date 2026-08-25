import { UsersDTO } from "../DTO/usersDTO.js";
import { createHash, validaHash } from "../utils/hash.js";
import { usersDAO } from "./index.js";

export const register=async(req,res)=>{

    let {firstName, lastName, email, password}=req.body
    if(!firstName || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`firstName | email | password son requeridos`})
    }

    // resto validaciones pertinentes
    try {
        let existe=await usersDAO.getby({email})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El email ${email} ya existe en la DB`})
        }

        password=createHash(password)

        let newUser=await usersDAO.create({firstName, lastName, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(201).json({
            message: `Login exitoso para ${firstName}`, 
            newUser: new UsersDTO(newUser)
        })
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }

}

export const login=async(req, res)=>{
    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email | password son requeridos`})
    }

    try {
        let user=await usersDAO.getby({email})
        if(!user){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }
        
        if(!validaHash(password, user.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message: `Login exitoso para ${user.firstName}`, user: new UsersDTO(user)});
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`internal server error`})
    }
}