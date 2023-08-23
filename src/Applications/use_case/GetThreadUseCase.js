class GetThreadUseCase {
  constructor({ threadRepository, userRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    this._validateParameters({ threadId });
    const thread = await this._threadRepository.findThreadById(threadId);
    thread.username = await this._userRepository.findUsernameById(thread.owner);
    thread.comments = await this._commentRepository.findCommentsByThreadId(thread.id);
    thread.comments = await Promise.all(thread.comments?.map(async (comment) => {
      comment.username = await this._userRepository.findUsernameById(comment.owner);
      return comment;
    }));
    return thread;
  }

  _validateParameters({ threadId }) {
    if (!threadId) {
      throw new Error('GET_THREAD_USE_CASE.NOT_CONTAIN_REQUIRED_PARAMETERS');
    }
    if (typeof threadId !== 'string') {
      throw new Error('GET_THREAD_USE_CASE.PARAMETERS_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetThreadUseCase;
