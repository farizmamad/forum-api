const DeleteComment = require("../../Domains/comments/entities/DeleteComment");

class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(userId, threadId, commentId) {
    const deleteComment = new DeleteComment({ userId, threadId, commentId });

    const thread = await this._threadRepository.findThreadById(deleteComment.threadId);
    if (thread.owner !== deleteComment.userId) {
      throw new Error('DELETE_COMMENT_USE_CASE.REQUEST_NOT_BY_OWNER');
    }

    return await this._commentRepository.deleteComment(commentId);
  }
}

module.exports = DeleteCommentUseCase;
