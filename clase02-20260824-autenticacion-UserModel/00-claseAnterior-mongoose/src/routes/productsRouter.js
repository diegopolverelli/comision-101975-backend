import { Router } from 'express';
import { productsController } from './index.js';
import { logger } from '../middlewares/log.js';
import { auth } from '../middlewares/auth.js';
import { informeProductos } from '../controllers/ProductsController.js';
export const router=Router()

router.use(logger)
router.use(auth)

router.get('/', productsController.getProducts)

router.get('/:id', productsController.getProductById)

router.get('/informe1/', informeProductos)

router.post('/', productsController.createProduct)