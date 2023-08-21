const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const { id: credentialId } = request.auth.credentials;
    const { threadId } = request.params; 
    
    const addedComment = await addCommentUseCase.execute(credentialId, threadId, request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment: addedComment,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
