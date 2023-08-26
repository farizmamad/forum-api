const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw error if thread owner is different from user id', async () => {
    // Arrange
    const userId = 'user-234';
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

    // Action and Assert
    expect(deleteCommentUseCase.execute(userId, threadId, commentId))
      .rejects.toThrowError('DELETE_COMMENT_USE_CASE.REQUEST_NOT_BY_OWNER');
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
