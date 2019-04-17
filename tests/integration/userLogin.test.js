import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { failedVerificationLogin, successLogin, invalidLoginEmail, invalidLoginPassowrd, failedLoginValidation } from '../mock/login';

const { expect } = chai;

chai.use(chaiHttp);

describe('Users Login', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('should return error for account that is yet to be verifiied', (done) => {
    agent.post('/api/v1/login')
      .send(failedVerificationLogin)
      .end((err, res) => {
        expect(res).to.have.status(401);
        const { body } = res;
        expect(body.data).to.be.equal('You are yet to verify your account');
        done();
      });
  });

  it('should login user', (done) => {
    agent.post('/api/v1/login')
      .send({
        email: 'chike@gmail.com',
        password: 'God1993$',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return true for valid token', (done) => {
    const payload = {
      email: 'chike@gmail.com',
      password: 'God1993$',
    };
    agent.post('/api/v1/login')
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { token } = res.body.data;
        const { email } = jwt.decode(token);
        expect(email).to.equal(successLogin.email);
        done();
      });
  });
  it('should return error for invalid email', (done) => {
    agent.post('/api/v1/login')
      .send(invalidLoginEmail)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return error for invalid password', (done) => {
    agent.post('/api/v1/login')
      .send(invalidLoginPassowrd)
      .end((err, res) => {
        expect(res).to.have.status(400);
        const { body } = res;
        expect(body.data).to.be.equal('Incorrect email or password');
        done();
      });
  });
  it('should return error for failed field validation', (done) => {
    agent.post('/api/v1/login')
      .send(failedLoginValidation)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
