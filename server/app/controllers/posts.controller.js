/**
 * @file app/controllers/posts.controller.js
 * @description 게시글 관련 컨트롤러
 * 251128 v.1.0.0 kimjunghyun init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import postService from "../services/post.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

/**
 * 게시글 리스트 조회 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next  - nextFunction 객체
 * @return
 */

async function index(req, res, next) {
  try {
    const page = req.body?.page || 1;

    const result = await postService.pagination(page);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

/**
 * 게시글 상세 조회 컨트롤러
 * @param {import("express").Request} req - 리퀘스트 객체
 * @param {import("express").Response} res - 레스폰스 객체
 * @param {import("express").NextFunction} next  - nextFunction 객체
 * @return
 */
async function show(req, res, next) {
  try {
    const result = await postService.show(req.params.id);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

export default {
  index,
  show,
}