import { getUserPolicy, userLogin } from './index';
import moxios from 'moxios';
import { mockUserPolicy } from '../../../mocks';

describe('Api Service', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Should return a users policy when userLogin api is called', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockUserPolicy,
      });
    });
    const result = await userLogin('username', 'password');
    expect(result).toEqual(mockUserPolicy);
  });
  it('Should return a users policy when getUserPolicy api is called with access_token on cookie', async () => {
    Object.defineProperty(document, 'cookie', {
      access_token: 'accessToken',
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockUserPolicy,
      });
    });
    const result = await getUserPolicy();
    expect(result).toEqual(mockUserPolicy);
  });
  it('Should not return a users policy when getUserPolicy api is called without access_token on cookie', async () => {
    const data = { msg: 'Unauthenticated' };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data,
      });
    });
    const result = await getUserPolicy();
    expect(result).toEqual(data);
  });
});
