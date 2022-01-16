const request = require('supertest');
const app = require('../server');
const { USERS, AUTH_TOKENS } = require('../util/seeders-data');
const httpStatus = require('http-status');
const { ERR_FIELD } = require('../config/settings');
const { AuthToken } = require('../models');


describe('Auth API', () => {
  it('Should sign in registered users', async () => {
    const user = USERS[3];
    const res1 = await request(app)
      .post('/api/auth/sign_in')
      .send(user);
    expect(res1.statusCode).toBe(httpStatus.OK);
    expect(res1.body).toHaveProperty('token');

    const unknownUser = { username: 'Elizabeth Swan', password: 'cde' };
    const res2 = await request(app)
      .post('/api/auth/sign_in')
      .send(unknownUser);
    expect(res2.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(res2.body).toEqual({ [ERR_FIELD]: ['Invalid credentials'] });
  });

  it('Should log users out', async () => {
    const res = await request(app)
      .post('/api/auth/log_out')
      .set('Authorization', `Token ${AUTH_TOKENS[0].key}`);
    expect(res.statusCode).toBe(httpStatus.NO_CONTENT);
    const tokenInDb = await AuthToken.findByPk(AUTH_TOKENS[0].key);
    expect(tokenInDb).toBeNull();
  });
});