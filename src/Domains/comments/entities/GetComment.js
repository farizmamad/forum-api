class GetComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, owner, date, content } = payload;
    this.id = id;
    this.owner = owner;
    this.date = date;
    this.content = content;
  }

  _verifyPayload({ id, owner, date, content }) {
    if (!id || !owner || !content || !date) {
      throw new Error('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof owner !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string'
    ) {
      throw new Error('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetComment;
