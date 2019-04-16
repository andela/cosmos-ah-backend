import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { payload } from '../mock/user';
import Auth from '../../src/middlewares/authenticator';

const { expect } = chai;

chai.use(chaiHttp);
let app = null;
let agent = null;

before(async () => {
  app = await startServer(7000);
  agent = chai.request(app);
});

describe('Error Profile Test', () => {
  it('Should return success for fetching user profile', () => {
    agent
      .get('/api/v1/profile/view/979eaa2e-5b8f-4103-8192-4639afae2ba2')
      .set({ Authorization: Auth.generateToken(payload) })
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body)
          .to.have.property('status')
          .eql('error');
        expect(body).to.have.property('message')
          .eql('This profile does not exist');
      });
  });
});

describe('User View  Error Profile Test', () => {
  it('Should return success for fetching user profile', () => {
    agent
      .get('/api/v1/profile/view/979eaa2e-5b8f-4103-8192-4639afae2ba')
      .set({ Authorization: Auth.generateToken(payload) })
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(500);
        expect(body)
          .to.have.property('status')
          .eql('error');
        expect(body).to.have.property('message')
          .eql('Something Went Wrong');
      });
  });
});
