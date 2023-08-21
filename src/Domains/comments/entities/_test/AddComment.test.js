const AddComment = require('../AddComment');

describe('an AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload1 = {
      content: 'abc',
      owner: 'abc',
    };
    const payload2 = {
      owner: 'abc',
      thread: 'abc',
    };
    const payload3 = {
      content: 'abc',
      thread: 'abc',
    };

    // Action and Assert
    expect(() => new AddComment(payload1)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddComment(payload2)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddComment(payload3)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = {
      content: 123,
      owner: 'abc',
      thread: 'abc',
    };
    const payload2 = {
      content: 'abc',
      owner: 123,
      thread: 'abc',
    };
    const payload3 = {
      content: 'abc',
      owner: 'abc',
      thread: 123,
    };

    // Action and Assert
    expect(() => new AddComment(payload1)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddComment(payload2)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddComment(payload3)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when owner contains more than 50 character', () => {
    // Arrange
    const payload = {
      content: 'sebuah thread',
      owner: 'user-dicodingdicodingdicodingdicodingdicodingdicoding',
      thread: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.OWNER_LIMIT_CHAR');
  });

  it('should throw error when thread contains more than 50 character', () => {
    // Arrange
    const payload = {
      content: 'sebuah thread',
      owner: 'user-123',
      thread: 'thread-dicodingdicodingdicodingdicodingdicodingdicoding',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.THREAD_LIMIT_CHAR');
  });

  it('should create addComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'sebuah thread',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
      thread: 'thread-123',
    };

    // Action
    const { content, owner, thread } = new AddComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
    expect(thread).toEqual(payload.thread);
  });
});
