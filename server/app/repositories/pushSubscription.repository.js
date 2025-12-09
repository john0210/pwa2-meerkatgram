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

async function findByUserId(t = null, userId) {
  return await PushSubscription.findAll(
    {
      where: {
        userId: userId
      }
    },
    {
      transaction: t
    }
  ); 
}
async function hardDestroy(t = null, id) {
  return await PushSubscription.destory({
    where: {id: id},
    force: true,
    transaction: t,
  });
}

export default {
  upsert,
  findByUserId,
  hardDestroy,
}