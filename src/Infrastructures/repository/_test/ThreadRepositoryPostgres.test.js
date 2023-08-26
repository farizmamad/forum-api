const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist add thread and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});

      const addThread = new AddThread({
        title: 'sebuah title',
        body: 'sebuah body',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepositoryPostgres.addThread(addThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
      expect(threads[0].id).toBeDefined();
      expect(threads[0].title).toEqual('sebuah title');
      expect(threads[0].owner).toEqual('user-123');
    });

    it('should return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});

      const addThread = new AddThread({
        title: 'sebuah title',
        body: 'sebuah body',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);

      // Assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'sebuah title',
        owner: 'user-123',
      }));
    });
  });

  describe('findThreadById function', () => {
    it('should return get thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});

      const addThread = new AddThread({
        title: 'sebuah title',
        body: 'sebuah body',
        owner: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread);
      const getThread = await threadRepositoryPostgres.findThreadById(addedThread.id);

      // Assert
      expect(getThread.id).toBeDefined();
      expect(getThread.title).toBeDefined();
      expect(getThread.body).toBeDefined();
      expect(getThread.date).toBeDefined();
      expect(getThread.owner).toBeDefined();
    });

    it('should throw error if thread was not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      expect(threadRepositoryPostgres.findThreadById('thread-123')).rejects.toThrowError(NotFoundError);
    });
  });

  describe('verifyThreadAvailability function', () => {
    it('should throw error if thread was not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      expect(threadRepositoryPostgres.verifyThreadAvailability('thread-123')).rejects.toThrowError(NotFoundError);
    });
  });
});
