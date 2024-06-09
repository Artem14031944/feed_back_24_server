import { body } from 'express-validator';
import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('name').isLength({ min: 3, max: 25 }),
    body('password').isLength({ min: 3, max: 25 }),
    UserController.registration
);
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 25 }),
    UserController.login
);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

export default router;