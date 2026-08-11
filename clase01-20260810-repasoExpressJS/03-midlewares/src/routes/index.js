import { ProductsController } from "../controllers/ProductsController.js";
import { ProductsDAO } from "../dao/ProductsDAO.js";

const productsDAO=new ProductsDAO()
export const productsController=new ProductsController(productsDAO)