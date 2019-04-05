import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Authenticator', () => {
  let app = null;
  let agent = null;

  before(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });
  it('should return 401, Unauthorized error', (done) => {
    agent.get('/api/v1/users/articles')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
