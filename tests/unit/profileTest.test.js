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
  app = await startServer(6000);
  agent = chai.request(app);
});

describe('User View  Error Profile Test that does not exist', () => {
  it('Should return error for fetching user profile that does not exist', () => {
    agent
      .get('/api/v1/profile/view/979eaa2e-5b8f-4103-8192-4639afae2ba')
      .set({ Authorization: Auth.generateToken(payload) })
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body)
          .to.have.property('status')
          .eql('error');
        expect(body).to.have.property('message')
          .eql('Invalid userId supplied');
      });
  });
});
