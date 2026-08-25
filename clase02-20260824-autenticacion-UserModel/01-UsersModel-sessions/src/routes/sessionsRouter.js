import { Router } from 'express';
import { login, register } from '../controller/sessionsController.js';
export const router=Router()

router.post('/register', register)
router.post("/login", login)