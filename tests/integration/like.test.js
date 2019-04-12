import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import LOGIN from '../mock/login';

const { expect } = chai;
let app = null;
let agent = null;
let userToken;


chai.use(chaiHttp);

describe('LIKE ARTICLE', () => {
  beforeEach(async () => {
    app = await startServer(6600);
    agent = chai.request(app);
  });
  it('login User', (done) => {
    agent
      .post('/api/v1/login')
      .send(LOGIN)
      .end((err, res) => {
        const { token } = res.body.data;
        userToken = token;
        done();
      });
  });
  it('should like an article', (done) => {
    const jwt = `Bearer ${userToken}`;
    agent
      .patch('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7/like')
      .set('Authorization', jwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.Like).to.equal(1);
        done();
      });
  });

  it('should unlike an article', (done) => {
    const jwt = `Bearer ${userToken}`;
    agent
      .patch('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7/like')
      .set('Authorization', jwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.Like).to.equal(0);
        done();
      });
  });
  it('should respond with error invalid Article ID', (done) => {
    const jwt = `Bearer ${userToken}`;
    agent
      .patch('/api/v1/articles/7/like')
      .set('Authorization', jwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
