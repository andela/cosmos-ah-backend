import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Root directory Test', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(6000);
    agent = chai.request(app);
  });

  it('Should return status: 200', (done) => {
    agent.get('/api/v1').end((_err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
});
