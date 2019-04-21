import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { articleId, invalidArticleUUID } from '../mock/bookmark';
import commentMock, { comment } from '../mock/comment';
import { JWT_TOKEN } from '../mock/user';
import Auth from '../../src/middlewares/authenticator';

const { assert } = chai;
let app = null;
let agent = null;

const { mockCommentIds, mockCommentArticleIds } = commentMock;

const [validCommentId1] = mockCommentIds.valid;
const [invalidCommentId1] = mockCommentIds.invalid;
const [validArticleId1, validArticleId2] = mockCommentArticleIds.valid;

chai.use(chaiHttp);

describe('Comment API test', () => {
  beforeEach(async () => {
    app = await startServer(5500);
    agent = chai.request(app);
  });
  describe('POST comment on article', () => {
    it('should add a comment successfully', (done) => {
      agent.post(`/api/v1/articles/${articleId}/comments`)
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

    it('should fail when an empty or no body is supplied', (done) => {
      agent.post(`/api/v1/articles/${articleId}/comments`)
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

  describe('PUT /articles/:articleId/comments/:commentId', () => {
    describe('handle valid request', () => {
      it('should update an article successfully', (done) => {
        agent.put(`/api/v1/articles/${validArticleId1}/comments/${validCommentId1}`)
          .set('Authorization', JWT_TOKEN)
          .send({ body: 'new comment' })
          .end((err, res) => {
            if (err) return done(err);
            const { status, body } = res;
            status.should.equal(200);
            body.status.should.equal('success');
            body.data.should.be.an('object');
            body.data.body.should.equal('new comment');
            done();
          });
      });

      it('should not update a comment if the previous comment and the new comment is similar', (done) => {
        agent
          .get(`/api/v1/articles/${validArticleId1}/comments/${validCommentId1}`)
          .set('Authorization', JWT_TOKEN)
          .send({ body: 'new comment' })
          .end((err, res) => {
            if (err) return done(err);
            const { status, body } = res;
            status.should.equal(200);
            body.status.should.equal('success');
            body.data.history.length.should.equal(3);
            done();
          });
      });
    });
    describe('handle invalid request', () => {
      it('should return  a 404 error for a comment that doesn\'t exist for an article', (done) => {
        agent
          .put(`/api/v1/articles/${validArticleId2}/comments/${validCommentId1}`)
          .set('Authorization', JWT_TOKEN)
          .send({ body: 'new comment' })
          .end((err, res) => {
            if (err) return done(err);
            const { status, body } = res;
            status.should.equal(404);
            body.status.should.equal('fail');
            body.data.should.equal('Comment does not exist');
            done();
          });
      });
      // skipped due to bug in running the tests
      it('should return a 404 error if comment is not owned by user', (done) => {
        const token = Auth.generateToken({ id: '146fa633-98dd-467f-9e4d-48eac3ee14e4' });
        agent
          .put(`/api/v1/articles/${validArticleId1}/comments/${validCommentId1}`)
          .set('Authorization', token)
          .send({ body: 'new comment' })
          .end((err, res) => {
            if (err) return done(err);
            const { status, body } = res;
            status.should.equal(422);
            body.status.should.equal('fail');
            body.data.should.equal('You can only edit your comment');
            done();
          });
      });
    });
    it('should return a server error for an invalid comment id', (done) => {
      agent
        .put(`/api/v1/articles/${validArticleId2}/comments/${invalidCommentId1}`)
        .set('Authorization', JWT_TOKEN)
        .send({ body: 'new comment' })
        .end((err, res) => {
          if (err) return done(err);
          const { status, body } = res;
          status.should.equal(500);
          body.status.should.equal('error');
          done();
        });
    });
  });

  describe('GET /articles/:articleId/comments', () => {
    it('should return all comments', (done) => {
      agent
        .get(`/api/v1/articles/${validArticleId1}/comments`)
        .set('Authorization', JWT_TOKEN)
        .end((err, res) => {
          if (err) return done(err);
          const { status, body } = res;
          status.should.equal(200);
          body.status.should.equal('success');
          body.data.should.be.an('array');
          done();
        });
    });

    it('should return an error if supplied wrong article id', (done) => {
      agent
        .get(`/api/v1/articles/${invalidArticleUUID}/comments`)
        .set('Authorization', JWT_TOKEN)
        .end((err, res) => {
          if (err) return done(err);
          const { status, body } = res;
          status.should.equal(500);
          body.status.should.equal('error');
          done();
        });
    });
  });

  describe('GET /articles/:articleId/comments/:commentId', () => {
    it('should return a single comment', (done) => {
      agent
        .get(`/api/v1/articles/${validArticleId1}/comments/${validCommentId1}`)
        .set('Authorization', JWT_TOKEN)
        .end((err, res) => {
          if (err) return done(err);
          const { status, body } = res;
          status.should.equal(200);
          body.status.should.equal('success');
          body.data.should.have.property('comment');
          body.data.should.have.property('history');
          body.data.history.should.be.an('array');
          done();
        });
    });

    it('should return an error if supplied wrong comment id', (done) => {
      agent
        .get(`/api/v1/articles/${validArticleId1}/comments/${invalidCommentId1}`)
        .set('Authorization', JWT_TOKEN)
        .end((err, res) => {
          if (err) return done(err);
          const { status, body } = res;
          status.should.equal(500);
          body.status.should.equal('error');
          done();
        });
    });
  });
});
