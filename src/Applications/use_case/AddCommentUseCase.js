const AddComment = require("../../Domains/comments/entities/AddComment");

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(userId, threadId, payload) {
    await this._threadRepository.verifyThreadAvailability(threadId);
    const addComment = new AddComment({
      content: payload.content,
      owner: userId,
      thread: threadId,
    });
    return await this._commentRepository.addComment(addComment);
  }
}

module.exports = AddCommentUseCase;
