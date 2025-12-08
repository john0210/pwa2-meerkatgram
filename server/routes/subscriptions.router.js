/**
 * @file routes/subscriptions.router.js
 * @description subscriptions 관련 라우터
 * 251208 v1.0.0 kimjunghyun init
 */

import subscriptionsCotroller from '../app/controllers/subscriptions.cotroller.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import express from 'express';

const subscriptionsRouter = express.Router();

subscriptionsRouter.post('/', authMiddleware, subscriptionsCotroller.subscribe);


export default subscriptionsRouter;