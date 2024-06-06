import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', AuthMiddleware, UserController.check);

export default router;