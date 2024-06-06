import { Router } from "express";
import ApplicationsController from "../controllers/ApplicationsController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = new Router();

router.post('/create', ApplicationsController.create);
router.get('/get_applications', AuthMiddleware, ApplicationsController.getAll);

export default router;