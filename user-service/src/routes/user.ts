import { Router } from 'express';

import { UserController } from '../controllers';
import { authenticateUser } from '../middlewares';

const router = Router();

router.route('/:userId').get(authenticateUser(), UserController.getUser);

router.route('/').get(authenticateUser(), UserController.listUsers);

export default router;
