class GetComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, date, content, is_delete } = payload;
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    if (is_delete) {
      this.content = '**komentar telah dihapus**';
    }
  }

  _verifyPayload({ id, username, date, content }) {
    if (!id || !username || !content || !date) {
      throw new Error('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof username !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string'
    ) {
      throw new Error('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetComment;
