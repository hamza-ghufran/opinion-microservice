import { Router } from 'express';

import { AccountController } from '../controllers';
import { authenticateUser } from '../middlewares';

const router = Router();

router.route('/create').post(AccountController.create);

router.route('/:accountId').patch(AccountController.update);

export default router;
