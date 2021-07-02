import { Router } from 'express';

import { AuthController } from '../controllers';

const router = Router();

router.route('/login').post(AuthController.loginUser);

router.route('/register').post(AuthController.registerUser);

export default router;
