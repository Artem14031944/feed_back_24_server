import { body, check } from 'express-validator';
import { Router } from "express";
import ListApplicationsMiddleware from "../middleware/ListApplicationsMiddleware.js"
import AuthAndAccessMiddleware from "../middleware/AuthAndAccessMiddleware.js";
import ApplicationsController from "../controllers/ApplicationsController.js";

const router = new Router();

router.post('/create',
    check('message').not().isEmpty(),
    ApplicationsController.create
);
router.patch('/resolved/:id', ApplicationsController.resolved);
router.delete('/delete/:id', ApplicationsController.delete);
router.get('/get_all_applications', AuthAndAccessMiddleware, ApplicationsController.getAll);
router.get('/get_applications/:id', ListApplicationsMiddleware, ApplicationsController.getЕheirApplications);

export default router;