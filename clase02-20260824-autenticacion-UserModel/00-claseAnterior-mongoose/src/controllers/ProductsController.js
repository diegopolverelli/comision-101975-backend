export class ProductsController{
    constructor(productsDAO){
        this.productsDAO=productsDAO
    }

    getProducts=async (req,res)=>{
        try {
            
            let productos=await this.productsDAO.get()
        
            res.setHeader('Content-Type','application/json')
            res.status(200).json({message:"Listado productos", productos})
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Internal server error`})
        }
    }

    getProductById=async (req,res)=>{

        try {
            let producto=`Producto ${req.params.id}`
        
            res.setHeader('Content-Type','application/json')
            res.status(200).json({producto})
            
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Internal server error`})
            
        }
    }

    createProduct=async(req, res)=>{
        try {

            // faltan validaciones sobre req.body: desestructurar propertys... validar, etc

            let newProduct=await this.productsDAO.create(req.body)
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({newProduct});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al crear producto: ${error.message}`})
        }
    }

}

export const informeProductos=async(req,res)=>{

    let producto="informe 1"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({producto})
}

