const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser');
const request = require('supertest');
const moxios = require('moxios');
const mockUserPolicy = require('../mocks');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(router);

describe('testing-server-routes', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('GET / - returns unauthenticated if no access_token on cookie', async () => {
    const { body } = await request(app).get('/');
    expect(body).toEqual({ msg: 'Unauthenticated' });
  });
  it('GET / - returns policy if access_token on cookie', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { mockUserPolicy },
      });
    });
    const { body } = await request(app)
      .get('/')
      .set('Cookie', 'access_token=someaccesstoken');
    expect(body).toEqual({ mockUserPolicy });
  });
  it('POST /login should return policy', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { access_token: 'someaccesstoken' },
      });
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { mockUserPolicy },
      });
    });
    const { body } = await request(app).post('/login').send({
      password: 'somepassword',
      username: 'someusername',
    });
    expect(body).toEqual({ mockUserPolicy });
  });
  it('POST /login should return "username or password incorrect" if no password received', async () => {
    const { body } = await request(app).post('/login').send({
      username: 'someusername',
    });
    expect(body).toEqual({ msg: 'Username or password incorrect' });
  });
  it('POST /login should return "username or password incorrect" if no username received', async () => {
    const { body } = await request(app).post('/login').send({
      password: 'somepassword',
    });
    expect(body).toEqual({ msg: 'Username or password incorrect' });
  });
});
