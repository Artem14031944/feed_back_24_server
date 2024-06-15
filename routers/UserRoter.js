import { validateUserLoginFields, validateUserRegistrationFields } from '../validators/userValidator.js';
import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.post('/registration', validateUserRegistrationFields, UserController.registration);
router.post('/login', validateUserLoginFields, UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

export default router;