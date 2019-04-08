import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Users Login', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('should login user', (done) => {
    agent.post('/api/v1/login')
      .send({
        email: 'martins@gmail.com',
        password: '%RYYT&^UTB*UYT*IUYIU',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return error for invalid email', (done) => {
    agent.post('/api/v1/login')
      .send({
        email: 'newmail@gmail.com',
        password: '%RYYT&^UTB*UYT*IUYIU',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return error for invalid password', (done) => {
    agent.post('/api/v1/login')
      .send({
        email: 'martins@gmail.com',
        password: 'wrongpassword',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { body } = res;
        expect(body.data).to.be.equal('invalid login details');
        done();
      });
  });
});
