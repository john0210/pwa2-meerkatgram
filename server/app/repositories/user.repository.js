/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v.1.0.0 kimjunghyun init
 */

import db from '../models/index.js';
const { User } = db;
/**
 * 
 * @param {import("sequelize").Transaction} t 
 * @param {string} email 
 * @returns 
 */
async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE email = ? AND deleted_at IS NULL;
  return await User.findOne(
    {
      where: {
        email: email
      },
      transaction: t
    },
  );
}
/**
 * 유저 모델 인스턴스로 세이브 처리
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js").User} user 
 * @returns 
 */
async function save(t= null, user) {
  return await user.save({transaction: t});
}
/**
 * 유저 idfh 유저정보 조회
 * @param {import("sequelize").Transaction} t 
 * @param {import("../models/index.js").User} user 
 * @returns {Promise<ImportAttributes("../models/User.js").User>}
 */
async function findByPk(t = null, id) {
  return await User.findByPk(id, {transaction: t});
}

async function create(t = null, data) {
  return await User.create(data, { transaction: t });
}

export default {
  findByEmail,
  save,
  findByPk,
  create,
}