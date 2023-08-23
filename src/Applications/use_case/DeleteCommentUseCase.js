class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(userId, threadId, commentId) {
    this._validateParameters({ userId, threadId, commentId });

    const thread = await this._threadRepository.findThreadById(threadId);
    if (thread.owner !== userId) {
      throw new Error('DELETE_COMMENT_USE_CASE.REQUEST_NOT_BY_OWNER');
    }

    return await this._commentRepository.deleteComment(commentId);
  }

  _validateParameters({ userId, threadId, commentId }) {
    if (!userId || !threadId || !commentId) {
      throw new Error('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_REQUIRED_PARAMETERS');
    }
    if (typeof userId !== 'string' || typeof threadId !== 'string' || typeof commentId !== 'string') {
      throw new Error('DELETE_COMMENT_USE_CASE.PARAMETERS_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteCommentUseCase;
