import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect, assert } = chai;

chai.use(chaiHttp);

describe('Root directory Test', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return status: 200', (done) => {
    agent.get('/api/v1/').end((_err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('incorrect API endpoint', (done) => {
    agent.get('/api/v1/incorrect').end((_err, res) => {
      console.log(res);
      assert.equal(res.status, 404);
      assert.equal(res.body.error, 'Incorrect API endpoint');
      done();
    });
  });
});
