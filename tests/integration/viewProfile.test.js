import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { payload } from '../mock/user';
import Auth from '../../src/middlewares/authenticator';

const { expect } = chai;

chai.use(chaiHttp);
let app = null;
let agent = null;

describe('User View Profile Test', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });
  it('Should return success for fetching user profile when an id is not passed', (done) => {
    agent
      .get('/api/v1/profile')
      .set({ Authorization: Auth.generateToken(payload) })
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body)
          .to.have.property('status')
          .eql('success');
        expect(body).to.have.property('data');
        done();
      });
  });

  it('Should return success for fetching user profile when an id is passed', (done) => {
    agent
      .get('/api/v1/profile/0560a5cc-99d2-4bed-84cd-f1c7e8d98d47')
      .set({ Authorization: Auth.generateToken(payload) })
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body)
          .to.have.property('status')
          .eql('success');
        expect(body).to.have.property('data');
        done();
      });
  });
});
