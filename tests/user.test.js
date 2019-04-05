import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer, closeServer } from '../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('API Social Authentication', () => {
  let app = null;
  let agent = null;

  before(async () => {
    app = await startServer(4000);
    agent = chai.request(app);
  });

  after(async () => {
    app = await closeServer();
    app = null;
  });

  describe('Facebook Authentication', () => {
    it('should Respond to /auth/facebook', () => {
      agent.get('/api/v1/auth/facebook').end((err, res) => {
        expect(res.statusCode).to.be(200);
      });
    });
  });
});
