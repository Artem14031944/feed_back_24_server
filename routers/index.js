import { Router } from "express";
import ApplicationRouter from './ApplicationRouter.js';
import UserRouter from './UserRoter.js';

const router = new Router();

router.use('/user', UserRouter);
router.use('/application', ApplicationRouter);

export default router;