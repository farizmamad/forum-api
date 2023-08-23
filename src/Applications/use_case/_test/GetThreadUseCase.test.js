const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThread = require('../../../Domains/threads/entities/GetThread');
const GetComment= require('../../../Domains/comments/entities/GetComment');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  it('should throw error if use case payload not contain thread id', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();
    const mockCommentRepository = new CommentRepository();

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
      commentRepository: mockCommentRepository,
    });

    // Action & Assert
    await expect(getThreadUseCase.execute())
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.NOT_CONTAIN_REQUIRED_PARAMETERS');
  });

  it('should throw error if thread not string', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();
    const mockCommentRepository = new CommentRepository();

    const deleteCommentUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
      commentRepository: mockCommentRepository,
    });

    // Action & Assert
    await expect(deleteCommentUseCase.execute(123))
      .rejects
      .toThrowError('GET_THREAD_USE_CASE.PARAMETERS_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error if thread not found', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.findThreadById = jest.fn()
      .mockImplementation(() => Promise.reject(new NotFoundError('thread tidak ditemukan')));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
      commentRepository: mockCommentRepository,
    });

    // Action & Assert
    await expect(getThreadUseCase.execute('thread-123'))
      .rejects
      .toThrowError(NotFoundError);
  });

  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';
    const ownerId = 'user-123';

    const mockThreadRepository = new ThreadRepository();   
    const mockUserRepository = new UserRepository();
    const mockCommentRepository = new CommentRepository(); 
    
    mockThreadRepository.findThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(new GetThread({
        id: 'thread-123',
        title: 'sebuah thread',
        body: 'sebuah body',
        date: "2021-08-08T07:22:33.555Z",
        owner: 'user-123',
      })));
    mockUserRepository.findUsernameById = jest.fn()
      .mockImplementation(() => Promise.resolve('dicoding'));
    mockCommentRepository.findCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve([new GetComment({
        id: "comment-123",
        owner: "user-123",
        date: "2021-08-08T07:22:33.555Z",
        content: "sebuah comment"
      })]));

    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      userRepository: mockUserRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    const thread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(mockThreadRepository.findThreadById).toHaveBeenCalledWith(threadId);
    expect(mockUserRepository.findUsernameById).toHaveBeenCalledWith(ownerId);
    expect(mockCommentRepository.findCommentsByThreadId).toHaveBeenCalledWith(threadId);
    expect(thread.username).toBeDefined();
    thread.comments.map(comment => expect(comment.username).toBeDefined());
  });
});
