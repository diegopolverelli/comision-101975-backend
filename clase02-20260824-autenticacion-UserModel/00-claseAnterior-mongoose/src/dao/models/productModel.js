import mongoose from "mongoose";

const productsSchema=new mongoose.Schema(
    {
        code: {
            type: String, unique: true, required: true, trim: true, 
        }, 
        title: {type: String, minLength: 3, required: true}, 
        descrip: {type: String, minLength: [10, "Cantidad minima de caracteres de la descripcion: 10. Usted ingresó {VALUE}"]}, 
        color: String, 
        price:{
            type: Number, default: 0
        }, 
        stock:{
            type: Number, 
            default: 0, 
            validate: {
                validator: data=>{
                    return data<0?false:true
                }, 
                message: (n)=>{
                    console.log(n)

                    return `No se aceptan valores negativos. Usted ingreso ${n.value}`
                }
            }
        }
    },
    {
        timestamps: true,
        // collection: "productos2022",
        strict: false, 
    }
)

export const productModel=mongoose.model(
    "products", 
    productsSchema
)