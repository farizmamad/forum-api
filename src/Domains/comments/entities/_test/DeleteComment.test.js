const DeleteComment = require('../DeleteComment');

describe('an GetComment entities', () => {
  it('should throw error if use case payload not contain commentId', async () => {
    // Arrange
    const payload1 = {
      threadId: "thread-123",
      commentId: "comment-123",
    };
    const payload2 = {
      userId: "user-123",
      commentId: "comment-123",
    };
    const payload3 = {
      userId: "user-123",
      threadId: "thread-123",
    };

    // Action and Assert
    expect(() => new DeleteComment(payload1)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new DeleteComment(payload2)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new DeleteComment(payload3)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if commentId not string', async () => {
    // Arrange
    const payload1 = {
      userId: 123,
      threadId: "thread-123",
      commentId: "comment-123",
    };
    const payload2 = {
      userId: "user-123",
      threadId: 123,
      commentId: "comment-123",
    };
    const payload3 = {
      userId: "user-123",
      threadId: "thread-123",
      commentId: 123,
    };

    // Action and Assert
    expect(() => new DeleteComment(payload1)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new DeleteComment(payload2)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new DeleteComment(payload3)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create deleteComment object correctly', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    // Action
    const { userId, threadId, commentId } = new DeleteComment(payload);

    // Assert
    expect(userId).toEqual(payload.userId);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
  });
});
