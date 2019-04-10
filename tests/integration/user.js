import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { startServer } from '../../src/server';
import { createUser, createUserEmailError, createUserOtherError } from '../mock/user';

const { expect } = chai;

chai.use(chaiHttp);

describe('Signup Authentication Test', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return success for signup route', (done) => {
    agent
      .post('/api/v1/signup')
      .send(createUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property('status')
          .eql('success');
        const { body } = res;
        const { token } = body.data;
        const decoded = jwt.decode(token);
        expect(body).should.be.an('object');
        expect(decoded.username).to.eql(createUser.username);
        expect(decoded.bio).to.eql(createUser.bio);
        expect(decoded.fullName).to.eql(createUser.fullName);
        expect(decoded.email).to.eql(createUser.email);
        expect(decoded.role).to.eql('user');
        expect(body).to.have.property('data');
        done();
      });
  });


  it('Should return error for Email', (done) => {
    agent
      .post('/api/v1/signup')
      .send(createUser)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body)
          .to.have.property('status')
          .eql('error');
        expect(res.body).to.have.property('message')
          .eql('This Email Already Exist');
        done();
      });
  });

  it('Should return error for usernamne', (done) => {
    agent
      .post('/api/v1/signup')
      .send(createUserEmailError)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body)
          .to.have.property('status')
          .eql('error');
        expect(res.body).to.have.property('message')
          .eql('This Username Already Exist');
        done();
      });
  });

  it('Should return error for other errors', (done) => {
    agent
      .post('/api/v1/signup')
      .send(createUserOtherError)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body)
          .to.have.property('status')
          .eql('error');
        expect(res.body).to.have.property('message')
          .eql('Something Went Wrong');
        done();
      });
  });
});
