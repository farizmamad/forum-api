const GetComment = require('../GetComment');

describe('an GetComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload1 = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      owner: "user-123",
      date: "2021-08-08T07:19:09.775Z",
    };
    const payload2 = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      owner: "user-123",
      content: "sebuah content",
    };
    const payload3 = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      date: "2021-08-08T07:19:09.775Z",
      content: "sebuah content",
    };

    // Action and Assert
    expect(() => new GetComment(payload1)).toThrowError('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new GetComment(payload2)).toThrowError('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new GetComment(payload3)).toThrowError('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload1 = {
      id: 123,
      owner: "user-123",
      date: "2021-08-08T07:19:09.775Z",
      content: "sebuah content",
    };
    const payload2 = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      owner: 123,
      date: "2021-08-08T07:19:09.775Z",
      content: "sebuah content",
    };
    const payload3 = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      owner: "user-123",
      date: 123,
      content: "sebuah content",
    };
    const payload4 = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      owner: "user-123",
      date: "2021-08-08T07:19:09.775Z",
      content: 123,
    };

    // Action and Assert
    expect(() => new GetComment(payload1)).toThrowError('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetComment(payload2)).toThrowError('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetComment(payload3)).toThrowError('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new GetComment(payload4)).toThrowError('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create getComment object correctly', () => {
    // Arrange
    const payload = {
      id: "comment-h_2FkLZhtgBKY2kh4CC02",
      owner: "user-123",
      date: "2021-08-08T07:19:09.775Z",
      content: "sebuah content",
    };

    // Action
    const { id, owner, date, content } = new GetComment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
    expect(content).toEqual(payload.content);
  });
});
