import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { JWT_TOKEN, bookmark, invalidArticleIdBookmark, invalidUUIDBookmark } from '../mock/bookmark';

const { assert } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('POST /api/v1/article/bookmark', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('POST /api/v1/article/bookmark', (done) => {
    agent.post('/api/v1/article/bookmark')
      .set('Authorization', JWT_TOKEN)
      .send(bookmark)
      .end((_err, res) => {
        assert.equal(res.status, 201);
        const { body } = res;
        assert.isObject(body);
        assert.equal(body.status, 'success');
        assert.property(body.data, 'id');
        assert.property(body.data, 'userId');
        assert.property(body.data, 'articleId');
        done();
      });
  });

  it('invalid bookmark article id', (done) => {
    agent.post('/api/v1/article/bookmark')
      .set('Authorization', JWT_TOKEN)
      .send(invalidArticleIdBookmark)
      .end((_err, res) => {
        assert.equal(res.status, 409);
        const { body } = res;
        assert.isObject(body);
        assert.equal(body.status, 'error');
        assert.equal(body.message, 'invalid article id');
        done();
      });
  });

  it('invalid UUID', (done) => {
    agent.post('/api/v1/article/bookmark')
      .set('Authorization', JWT_TOKEN)
      .send(invalidUUIDBookmark)
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
