import { Router } from 'express';
import { login, register } from '../controllers/sessionsController.js';

import passport from "passport"

export const router = Router()

// router.post('/login', login)
router.post(
    '/login',
    // paso 3
    passport.authenticate("login", { session: false, failureRedirect: "/error" }),
    login
)

router.post(
    "/register", 
    // paso 3    
    // passport.authenticate("registro", {session: false, failureRedirect: "/error"}),
    passport.authenticate("registro", {session: false, }),
    register
)
