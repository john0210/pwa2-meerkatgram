/**
 * @file app/repositories/pushSubscription.repository.js
 * @description pushSubscription
 * 251208 v.1.0.0 kimjunghyun init
 */

import db from '../models/index.js';
const { PushSubscription } = db;

async function upsert(t= null, data) {
 return await PushSubscription.upsert(data, {transaction: t}); 
}

export default {
  upsert,
}