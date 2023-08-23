const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist add comment and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      const addComment = new AddComment({
        content: 'sebuah content',
        thread: 'thread-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(addComment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(comments).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      
      const addComment = new AddComment({
        content: 'sebuah content',
        thread: 'thread-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(addComment);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: 'sebuah content',
        owner: 'user-123',
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should erase comment and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      const addComment = new AddComment({
        content: 'sebuah content',
        thread: 'thread-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(addComment);
      
      const commentsBeforeDelete = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(commentsBeforeDelete).toHaveLength(1);

      await commentRepositoryPostgres.deleteComment(addedComment.id);

      // Assert
      const commentsAfterDelete = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(commentsAfterDelete).toHaveLength(1);
      expect(commentsAfterDelete[0].is_delete).toBeTruthy();
    });

    it('should throw NotFoundError if comment not found', async () => {
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      expect(commentRepositoryPostgres.deleteComment('comment-123')).rejects.toThrowError(NotFoundError);
    });
  });

  describe('findCommentsByThreadId', () => {
    it('should return array of comments correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});

      const addComment = new AddComment({
        content: 'sebuah content',
        thread: 'thread-123',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(addComment);

      const comments = await commentRepositoryPostgres.findCommentsByThreadId('thread-123');
      
      // Assert
      expect(comments).toHaveLength(1);
    });
  });
});
