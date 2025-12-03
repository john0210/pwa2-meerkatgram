/**
 * @file app/services/comments.service.js
 * @description comments Service
 * 251203 kimjunghyun init 
*/

import commentRepository from "../repositories/comment.repository.js"

/**
 * 코멘트 작성 정리
 * @param {{postId: string, userId: string, content: string}} data
 */
async function store(data) {
  return await commentRepository.create(null, data);
}

export default {
  store,
}