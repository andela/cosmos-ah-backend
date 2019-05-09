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
  app = await startServer(9000);
  agent = chai.request(app);
});

describe('User View Profile Test', () => {
  it('Should return success for fetching user profile', (done) => {
    agent
      .get('/api/v1/profile/view/979eaa2e-5b8f-4103-8192-4639afae2ba8')
      .set({ Authorization: Auth.generateToken(payload) })
      .end((err, res) => {
        const { body } = res;
        const { user } = body.data;
        expect(res).to.have.status(200);
        expect(body)
          .to.have.property('status')
          .eql('success');
        expect(body).to.have.property('data');
        expect(user.fullName).to.have.eql('Martins Aloba');
        expect(user.email).to.have.eql('martins@gmail.com');
        expect(user.username).to.have.eql('martinsaloba');
        done();
      });
  });
});
