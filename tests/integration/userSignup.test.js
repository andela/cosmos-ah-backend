import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { createUser, createUserEmailError, editPayload, createUserError, createEditUser } from '../mock/user';
import Auth from '../../src/middlewares/authenticator';
import { startServer } from '../../src/server';

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
        expect(decoded.role).to.eql('author');
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
          .eql('fail');
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
          .eql('fail');
        expect(res.body).to.have.property('message')
          .eql('This Username Already Exist');
        done();
      });
  });

  it('Should return success for editing a profile', (done) => {
    agent
      .put('/api/v1/profile/edit')
      .set({ Authorization: Auth.generateToken(editPayload) })
      .send(createEditUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('status')
          .eql('success');
        expect(res.body).to.have.property('message')
          .eql('User Profile Updated Successfully');
        done();
      });
  });

  it('Should return error for editing a profile', (done) => {
    agent
      .put('/api/v1/profile/edit')
      .set({ Authorization: Auth.generateToken(editPayload) })
      .send(createUserError)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property('status')
          .eql('fail');
        expect(res.body.message).to.have.property('notification')
          .eql('The notification field is required.');
        done();
      });
  });
});
