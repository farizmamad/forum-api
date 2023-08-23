const GetThread = require('../GetThread');

describe('an GetThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload1 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
    };
    const payload2 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: "sebuah body thread",
      owner: "user-123",
    };
    const payload3 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };
    const payload4 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };
    const payload5 = {
      title: "sebuah thread",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };

    // Action and Assert
    expect(() => new GetThread(payload1)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new GetThread(payload2)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new GetThread(payload3)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new GetThread(payload4)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new GetThread(payload5)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = {
      id: 123,
      title: "sebuah thread",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };
    const payload2 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: 123,
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };
    const payload3 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: 123,
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };
    const payload4 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: "sebuah body thread",
      date: 123,
      owner: "user-123",
    };
    const payload5 = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: 123,
    };

    // Action and Assert
    expect(() => new GetThread(payload1)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetThread(payload2)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetThread(payload3)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetThread(payload4)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetThread(payload5)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create getThread object correctly', () => {
    // Arrange
    const payload = {
      id: "thread-h_2FkLZhtgBKY2kh4CC02",
      title: "sebuah thread",
      body: "sebuah body thread",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
    };

    // Action
    const { id, title, body, date, owner } = new GetThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(owner).toEqual(payload.owner);
  });
});
