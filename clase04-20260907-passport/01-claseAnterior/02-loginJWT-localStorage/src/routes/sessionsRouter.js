import { Router } from 'express';
import { login } from '../controllers/sessionsController.js';
export const router=Router()

router.post('/login', login)