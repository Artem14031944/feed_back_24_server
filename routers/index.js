import { Router } from 'express';

const router = new Router();

router.use('/user');
router.use('/application');

export default router;