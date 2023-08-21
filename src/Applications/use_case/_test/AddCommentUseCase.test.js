const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'sebuah komentar',
    };

    const mockUserId = 'user-DWrT3pXe1hccYkV1eIAxS';
    const mockThreadId = 'thread-123';

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedComment({
        id: 'comment-123',
        content: useCasePayload.content,
        owner: mockUserId,
      })));

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(mockUserId, mockThreadId, useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(new AddedComment({
      id: 'comment-123',
      content: 'sebuah komentar',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    }));

    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      content: useCasePayload.content,
      owner: mockUserId,
      thread: mockThreadId,
    }));
  });
});
