import { Router } from 'express';
import { productsController } from './index.js';
import { logger } from '../middlewares/log.js';
import { auth } from '../middlewares/auth.js';
export const router=Router()

router.use(logger)
router.use(auth)

router.get('/', productsController.getProducts)

router.get('/:id', productsController.getProductById)

router.get('/informe1/',(req,res)=>{

    let producto="informe 1"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({producto})
})

router.post('/',(req,res)=>{

    let newProduct="nuevo producto"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({newProduct})
})