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
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('article bookmarked successfully', (done) => {
    agent.get(`/api/v1/article/${articleId}/bookmark`)
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 201);
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
        const { status, body } = res;
        assert.equal(status, 200);
        assert.isObject(body);
        assert.equal(body.status, 'success');
        assert.equal(body.message, 'Your article has been unbookmarked');
        done();
      });
  });

  it('invalid article UUID', (done) => {
    agent.get(`/api/v1/article/${invalidArticleUUID}/bookmark`)
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 404);
        assert.isObject(body);
        assert.equal(body.message, 'invalid artcile id of type UUID');
        done();
      });
  });

  it('when article UUID as id does not exist', (done) => {
    agent.get('/api/v1/article/7fd94aad-8a0b-4231-acba-3b83dce14939/bookmark')
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 404);
        assert.isObject(body);
        assert.equal(body.message, 'invalid article id');
        done();
      });
  });
});
