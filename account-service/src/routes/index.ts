import { Router } from 'express';

import AccountRouter from './account';

const ApiRouter = Router();

ApiRouter.use('/', AccountRouter);

export default ApiRouter;