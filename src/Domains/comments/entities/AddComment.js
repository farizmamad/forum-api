class AddComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, owner, thread } = payload;
    this.content = content;
    this.owner = owner;
    this.thread = thread;
  }

  _verifyPayload({ content, thread, owner }) {
    if (!content || !thread || !owner) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof thread !== 'string' || typeof owner !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (owner.length > 50) {
      throw new Error('ADD_COMMENT.OWNER_LIMIT_CHAR');
    }

    if (thread.length > 50) {
      throw new Error('ADD_COMMENT.THREAD_LIMIT_CHAR');
    }
  }
}

module.exports = AddComment;
