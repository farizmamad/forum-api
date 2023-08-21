const AddComment = require("../../Domains/comments/entities/AddComment");

class AddCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(userId, threadId, payload) {
    const addComment = new AddComment({
      content: payload.content,
      owner: userId,
      thread: threadId,
    });
    return await this._commentRepository.addComment(addComment);
  }
}

module.exports = AddCommentUseCase;
