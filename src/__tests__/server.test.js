'use strict';

process.env.SECRET = 'TEST_SECRET';

const supertest = require('supertest');
const { app } = require('../server');
const { db } = require('../models');
const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Test API Server', () => {

  test('404 on invalid route', async () => {
    const response = await request.get('/definitelydoesnotexist');
    expect(response.status).toEqual(404);
  });

  test('404 on invalid route', async () => {
    const response = await request.get('/also/does/not/exist');
    expect(response.status).toEqual(404);
  });

  test('Test root route', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });

  // test('500 if name not specified in /users POST', async () => {
  //   const response = await request.post('/api/v1/users').send({
  //     notName: 'Test User',
  //   });
  //   expect(response.status).toEqual(500);
  // });

});

describe('Test authentication', () => {
  const testUsername = 'testAdmin';
  const testPassword = 'adminpasswordSuperSecret!';
  const testRole = 'admin';

  test('Admin signup', async () => {
    const signUpResponse = await request.post('/auth/signup').send({
      username: testUsername,
      password: testPassword,
      role: testRole,
    });
    const { username, role, capabilities, token } = signUpResponse.body;

    expect(username).toEqual(testUsername);
    expect(role).toEqual(testRole);
    expect(capabilities).toContain('create', 'read', 'update', 'delete');
    expect(token).toBeTruthy();
  });
  
  test('Admin signin', async () => {
    const encodedAuth = Buffer.from(`${testUsername}:${testPassword}`).toString('base64');
    
    const signInResponse = await request
      .post('/auth/signin')
      .set('Authorization', 'basic ' + encodedAuth);

    const { username, role, capabilities, token } = signInResponse.body;
    
    expect(username).toEqual(testUsername);
    expect(role).toEqual(testRole);
    expect(capabilities).toContain('create', 'read', 'update', 'delete');
    expect(token).toBeTruthy();
  });
});
  
describe('Test user authentication', () => {
  test('User signup', async () => {
    const signUpResponse = await request.post('/auth/signup').send({
      username: 'testUser',
      password: 'thisisapassword',
      role: 'user',
    });
    const { username, role, capabilities, token } = signUpResponse.body;
    expect(username).toEqual('testUser');
    expect(role).toEqual('user');
    expect(capabilities).toContain('read');
    expect(token).toBeTruthy();
  });

})


describe('Test /books endpoint methods', () => {
  test('Handle getting all books', async () => {
    const response = await request.get('/api/v1/books');
    expect(response.status).toEqual(200);
  });

  test('Create a book', async () => {
    let response = await request.post('/api/v1/books').send({
      title: 'Test Book',
      author: 'Test Author',
      pages: 100,
    });
    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual('Test Book');
    expect(response.body.author).toEqual('Test Author');
    expect(response.body.pages).toEqual(100);
  });

  test('Get a book by id', async () => {
    const response = await request.get('/api/v1/books/1');
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Test Book');
    expect(response.body.author).toEqual('Test Author');
    expect(response.body.pages).toEqual(100);
  });

  test('Update a book', async () => {
    let response = await request.put('/api/v1/books/1').send({
      title: 'Updated Test Book',
    });
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('Updated Test Book');
    expect(response.body.author).toEqual('Test Author');
    expect(response.body.pages).toEqual(100);
  });

  test('Delete a book', async () => {
    let response = await request.delete('/api/v1/books/1');
    expect(response.status).toEqual(200);
    expect(response.body.title).toBeUndefined();
  });
});