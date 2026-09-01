import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        firstName: {
            type: String, 
            trim: true, 
            required: true, 
            minLength: [3, "Nombre debe tener un minimo de 3 caracteres"]
        }, 
        lastName: {
            type: String, 
            trim: true, 
            minLength: [3, "Nombre debe tener un minimo de 3 caracteres"]
        }, 
        email: {
            type: String, 
            trim: true, 
            required: true,
            unique: true,
        }, 
        password: {
            type: String, 
            required: true,
            minLength: 10, 
        }, 
        role: {
            type: String, 
            enum: ["user", "manager", "admin"],
            default: "user"
        }
    }, 
    {
        timestamps: true, 
    }
)


export const userModel=mongoose.model(
    "user",
    userSchema
)