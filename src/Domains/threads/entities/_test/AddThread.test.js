const AddThread = require('../AddThread');

describe('an AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload1 = {
      title: 'abc',
      body: 'abc',
    };
    const payload2 = {
      title: 'abc',
      owner: 'abc',
    };
    const payload3 = {
      body: 'abc',
      owner: 'abc',
    };

    // Action and Assert
    expect(() => new AddThread(payload1)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddThread(payload2)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddThread(payload3)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = {
      title: 123,
      body: 'abc',
      owner: 'abc',
    };
    const payload2 = {
      title: 'abc',
      body: 123,
      owner: 'abc',
    };
    const payload3 = {
      title: 'abc',
      body: 'abc',
      owner: 123,
    };

    // Action and Assert
    expect(() => new AddThread(payload1)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddThread(payload2)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddThread(payload3)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when owner contains more than 50 character', () => {
    // Arrange
    const payload = {
      title: 'sebuah thread',
      body: 'body dari sebuah thread',
      owner: 'user-dicodingdicodingdicodingdicodingdicodingdicoding',
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.OWNER_LIMIT_CHAR');
  });

  it('should create addThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'sebuah thread',
      body: 'body dari sebuah thread',
      owner: 'user-DWrT3pXe1hccYkV1eIAxS',
    };

    // Action
    const { title, body, owner } = new AddThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
