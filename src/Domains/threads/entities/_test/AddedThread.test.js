const AddedThread = require('../AddedThread');

describe('an AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload1 = {
      title: 'abc',
      owner: 'abc',
    };
    const payload2 = {
      id: 'abc',
      owner: 'abc',
    };
    const payload3 = {
      id: 'abc',
      title: 'abc',
    };

    // Action and Assert
    expect(() => new AddedThread(payload1)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddedThread(payload2)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddedThread(payload3)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = {
      id: 123,
      title: 'abc',
      owner: 'abc',
    };
    const payload2 = {
      id: 'abc',
      title: 123,
      owner: 'abc',
    };
    const payload3 = {
      id: 'abc',
      title: 'abc',
      owner: 123,
    };

    // Action and Assert
    expect(() => new AddedThread(payload1)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddedThread(payload2)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddedThread(payload3)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'sebuah thread',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    // Action
    const { id, title, owner } = new AddedThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
