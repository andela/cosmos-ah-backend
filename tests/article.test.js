import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../src/server';

const { assert } = chai;

chai.use(chaiHttp);

describe('comment on highlighted article text', () => {
  let app = null;
  let agent = null;

  before(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return status: 200', (done) => {
    agent.get('/api/v1/comment/highlight-text').end((err, res) => {
      assert.isObject(res.body);
      assert.equal(res.status, 201);
      done();
    });
  });
});
