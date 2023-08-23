const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw error if use case payload not contain commentId', async () => {
    // Arrange
    const userId = 'user-123';
    const threadId = 'thread-123';

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action & Assert
    await expect(deleteCommentUseCase.execute(userId, threadId))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_REQUIRED_PARAMETERS');
  });

  it('should throw error if commentId not string', async () => {
    // Arrange
    const userId = 'user-123';
    const threadId = 'thread-123';

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action & Assert
    await expect(deleteCommentUseCase.execute(userId, threadId, 123))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.PARAMETERS_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const userId = 'user-123';
    const threadId = 'thread-123';
    const commentId = 'comment-123';

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();    
    
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.findThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedThread({
        id: 'thread-123',
        title: 'sebuah thread',
        owner: 'user-123',
      })));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    });

    // Act
    await deleteCommentUseCase.execute(userId, threadId, commentId);

    // Assert
    expect(mockCommentRepository.deleteComment)
      .toHaveBeenCalledWith(commentId);
    expect(mockThreadRepository.findThreadById)
      .toHaveBeenCalledWith(threadId);
  });
});
