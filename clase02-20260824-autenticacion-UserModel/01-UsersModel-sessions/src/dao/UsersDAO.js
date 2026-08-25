import { userModel } from "./models/usersModel.js";

export class UsersDAO{
    async create(user){
        let newUser=await userModel.create(user)
        return newUser.toJSON()  // deshidrata el documento de mongoose (lo transforma en objeto plano de JS)
    }

    async getby(filtro={}){
        return await userModel.findOne(filtro).lean()
    }
}