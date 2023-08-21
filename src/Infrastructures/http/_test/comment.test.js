const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads/{threadId}/comments endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and persisted comment', async () => {
      // Arrange

      // create user
      const registerUserPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: registerUserPayload,
      });

      // login
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };

      const authenticationResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseJsonAuthentication = JSON.parse(authenticationResponse.payload);

      const createThreadPayload = {
        title: 'Sebuah title',
        body: 'Sebuah body',
      };

      const createThreadResponse = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: createThreadPayload,
        headers: {
          Authorization: `Bearer ${responseJsonAuthentication?.data?.accessToken}`,
        },
      });

      const responseJsonCreatedThread = JSON.parse(createThreadResponse.payload);

      const requestPayload = {
        content: 'Sebuah komentar',
      };

      const accessToken = responseJsonAuthentication?.data?.accessToken;
      const threadId = responseJsonCreatedThread?.data?.addedThread?.id;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange

      // create user
      const registerUserPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: registerUserPayload,
      });

      // login
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };

      const authenticationResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseJsonAuthentication = JSON.parse(authenticationResponse.payload);

      const createThreadPayload = {
        title: 'Sebuah title',
        body: 'Sebuah body',
      };

      const createThreadResponse = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: createThreadPayload,
        headers: {
          Authorization: `Bearer ${responseJsonAuthentication?.data?.accessToken}`,
        },
      });

      const responseJsonCreatedThread = JSON.parse(createThreadResponse.payload);
      
      const requestPayload = {};

      const accessToken = responseJsonAuthentication?.data?.accessToken;
      const threadId = responseJsonCreatedThread?.data?.addedThread?.id;

      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      
      // create user
      const registerUserPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      await server.inject({
        method: 'POST',
        url: '/users',
        payload: registerUserPayload,
      });

      // login
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };

      const authenticationResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseJsonAuthentication = JSON.parse(authenticationResponse.payload);

      const createThreadPayload = {
        title: 'Sebuah title',
        body: 'Sebuah body',
      };

      const createThreadResponse = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: createThreadPayload,
        headers: {
          Authorization: `Bearer ${responseJsonAuthentication?.data?.accessToken}`,
        },
      });

      const responseJsonCreatedThread = JSON.parse(createThreadResponse.payload);

      const requestPayload = {
        content: 123,
      };

      const accessToken = responseJsonAuthentication?.data?.accessToken;
      const threadId = responseJsonCreatedThread?.data?.addedThread?.id;

      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena tipe data tidak sesuai');
    });
  });
});
