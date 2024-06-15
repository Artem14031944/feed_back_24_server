import { validateApplicationCreateFields, validateApplicationResolvedFields} from '../validators/applicationValidator.js';
import { Router } from "express";
import GetListApplicationsMiddleware from "../middleware/ApplicationMiddlewaer/GetListApplicationsMiddleware.js"
import UserAuthMiddleware from "../middleware/UserMiddleware/UserAuthMiddleware.js";
import ApplicationsController from "../controllers/ApplicationsController.js";

const router = new Router();

router.post('/create', validateApplicationCreateFields, ApplicationsController.create);
router.patch('/resolved/:id', validateApplicationResolvedFields, ApplicationsController.resolved);
router.delete('/delete/:id', ApplicationsController.delete);
router.get('/get_all_applications', UserAuthMiddleware, ApplicationsController.getAll);
router.get('/get_applications/:id', GetListApplicationsMiddleware, ApplicationsController.getЕheirApplications);

export default router;