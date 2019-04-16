import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { JWT_TOKEN, articleId, invalidArticleUUID } from '../mock/bookmark';


const { assert } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('POST /api/v1/:articleId/bookmark', () => {
  beforeEach(async () => {
    app = await startServer(5500);
    agent = chai.request(app);
  });

  it('article bookmarked successfully', (done) => {
    agent.get(`/api/v1/article/${articleId}/bookmark`)
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        assert.equal(res.status, 201);
        const { body } = res;
        assert.isObject(body);
        assert.equal(body.status, 'success');
        assert.equal(body.message, 'Your article has been bookmarked');
        done();
      });
  });

  it('bookmark deleted', (done) => {
    agent.get(`/api/v1/article/${articleId}/bookmark`)
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        assert.equal(res.status, 200);
        const { body } = res;
        assert.isObject(body);
        assert.equal(body.status, 'success');
        assert.equal(body.message, 'Your article has been unbookmarked');
        done();
      });
  });


  it('invalid UUID', (done) => {
    agent.get(`/api/v1/article/${invalidArticleUUID}/bookmark`)
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        assert.equal(res.status, 409);
        const { body } = res;
        assert.isObject(body);
        assert.equal(body.status, 'error');
        assert.equal(body.message, 'invalid id of type UUID');
        done();
      });
  });
});
