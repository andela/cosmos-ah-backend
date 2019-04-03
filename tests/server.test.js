import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Root directory Test', () => {
  let app = null;
  let agent = null;

  before(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return status: 200', (done) => {
    agent.get('/api/v1').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
});
