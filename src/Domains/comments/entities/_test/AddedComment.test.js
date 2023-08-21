const AddedComment = require('../AddedComment');

describe('an AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload1 = {
      content: 'abc',
      owner: 'abc',
    };
    const payload2 = {
      id: 'abc',
      owner: 'abc',
    };
    const payload3 = {
      id: 'abc',
      content: 'abc',
    };

    // Action and Assert
    expect(() => new AddedComment(payload1)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddedComment(payload2)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddedComment(payload3)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = {
      id: 123,
      content: 'abc',
      owner: 'abc',
    };
    const payload2 = {
      id: 'abc',
      content: 123,
      owner: 'abc',
    };
    const payload3 = {
      id: 'abc',
      content: 'abc',
      owner: 123,
    };

    // Action and Assert
    expect(() => new AddedComment(payload1)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddedComment(payload2)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddedComment(payload3)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'content comment',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    // Action
    const { id, content, owner } = new AddedComment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
