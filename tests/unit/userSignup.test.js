import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { createUserError } from '../mock/user';

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
      .send(createUserError)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property('status')
          .eql('fail');
        done();
      });
  });
});
