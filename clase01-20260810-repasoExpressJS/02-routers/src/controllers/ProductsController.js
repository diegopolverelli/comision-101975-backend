export class ProductsController{
    constructor(productsDAO){
        this.productsDAO=productsDAO
    }

    getProducts=async (req,res)=>{
        let productos=await this.productsDAO.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:"Listado productos", productos})
    }

    getProductById=async (req,res)=>{

        let producto=`Producto ${req.params.id}`
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({producto})
    }

}