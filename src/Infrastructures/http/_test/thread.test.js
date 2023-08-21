const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // create user
      const registerUserPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      // Action
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

      // Action
      const authenticationResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseJsonAuthentication = JSON.parse(authenticationResponse.payload);

      // Arrange
      const requestPayload = {
        title: 'Sebuah title',
        body: 'Sebuah body',
      };

      const accessToken = responseJsonAuthentication?.data?.accessToken;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // create user
      const registerUserPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      // Action
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

      // Action
      const authenticationResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseJsonAuthentication = JSON.parse(authenticationResponse.payload);
      
      // Arrange
      const requestPayload = {
        body: 'Sebuah body',
      };

      const accessToken = responseJsonAuthentication?.data?.accessToken;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // create user
      const registerUserPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      // Action
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

      // Action
      const authenticationResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });

      const responseJsonAuthentication = JSON.parse(authenticationResponse.payload);

      // Arrange
      const requestPayload = {
        title: 123,
        body: 'Sebuah body'
      };

      const accessToken = responseJsonAuthentication?.data?.accessToken;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    });
  });
});
