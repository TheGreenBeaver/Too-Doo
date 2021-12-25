const request = require('supertest');
const app = require('../server');
const { USERS, TO_DOS } = require('../util/seeders-data');
const httpStatus = require('http-status');

describe('ToDos API', () => {
  it('Should return a list of ToDos for user', async () => {
    const tokenRes = await request(app)
      .post('/api/auth/sign_in')
      .send(USERS[1]);
    const { token } = tokenRes.body;

    const toDosRes = await request(app)
      .get('/api/to_dos')
      .set('Authorization', `Token ${token}`);
    expect(toDosRes.statusCode).toBe(httpStatus.OK);
    const expected = TO_DOS.filter(t => t.user_id === 2)
    expect(toDosRes.body.length).toBe(expected.length);
    expected.forEach((t, idx) => {
      expect(toDosRes.body[idx].title).toBe(t.title);
    });
  });

  it('Should properly update ToDos', async () => {
    const tokenRes = await request(app)
      .post('/api/auth/sign_in')
      .send(USERS[3]);
    const { token } = tokenRes.body;

    const origRes = await request(app)
      .get('/api/to_dos/4')
      .set('Authorization', `Token ${token}`);
    expect(origRes.statusCode).toBe(httpStatus.OK);
    expect(origRes.body.updatedAt).toEqual(origRes.body.createdAt);

    const newDesc = '(Consume them)\nUPD: Also make the whole world suffer in agony'
    const updRes = await request(app)
      .patch('/api/to_dos/4')
      .set('Authorization', `Token ${token}`)
      .send({ description: newDesc });
    expect(updRes.body.description).toBe(newDesc);
    expect(updRes.body.updatedAt).not.toEqual(updRes.body.createdAt);
  });
});