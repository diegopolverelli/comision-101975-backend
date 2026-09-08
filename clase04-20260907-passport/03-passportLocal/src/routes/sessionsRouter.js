import { Router } from 'express';
import { login } from '../controllers/sessionsController.js';

import passport from "passport"

export const router=Router()

// router.post('/login', login)
router.post(
    '/login', 
    passport.authenticate("login", {session:false, failureRedirect: "/error"}),
    login)