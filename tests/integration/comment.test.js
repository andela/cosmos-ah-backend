import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { articleId, invalidArticleId } from '../mock/bookmark';
import { comment } from '../mock/comment';
import { JWT_TOKEN } from '../mock/user';

const { assert } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('POST comment on article', () => {
  beforeEach(async () => {
    app = await startServer(5500);
    agent = chai.request(app);
  });

  it('comment added successfully', (done) => {
    agent.post(`/api/v1/articles/${articleId}/comment`)
      .set('Authorization', JWT_TOKEN)
      .send(comment)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 201);
        assert.isObject(body);
        assert.equal(body.status, 'success');
        assert.property(body, 'data');
        done();
      });
  });


  it('invalid article Id  ', (done) => {
    agent.post(`/api/v1/articles/${invalidArticleId}/comment`)
      .set('Authorization', JWT_TOKEN)
      .send(comment)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 404);
        assert.isObject(body);
        assert.equal(body.message, 'invalid article id');
        done();
      });
  });
  it('empty body content  ', (done) => {
    agent.post(`/api/v1/articles/${articleId}/comment`)
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        const { status, body } = res;
        assert.equal(status, 400);
        assert.isObject(body);
        assert.equal(body.status, 'fail');
        done();
      });
  });
});
