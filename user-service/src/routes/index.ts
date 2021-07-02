import { Router } from 'express';

import UserRouter from './user';
import AuthRouter from './auth';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);

ApiRouter.use('/', UserRouter);

export default ApiRouter;