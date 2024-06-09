import { Router } from "express";
import AuthAndAccessMiddleware from "../middleware/AuthAndAccessMiddleware.js";
import ApplicationsController from "../controllers/ApplicationsController.js";

const router = new Router();

router.post('/create', ApplicationsController.create);
router.patch('/resolved/:id', ApplicationsController.resolved);
router.delete('/delete/:id', ApplicationsController.delete);
router.get('/get_applications', AuthAndAccessMiddleware, ApplicationsController.getAll);

export default router;