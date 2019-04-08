import 'chai/register-should';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { UPDATED_ARTICLE, ARTICLE, MALFORMED_ARTICLE } from '../mock/article';
import userMock, { JWT_TOKEN, JWT_TOKEN_AUTHOR } from '../mock/user';
import { Article } from '../../src/models';
import Auth from '../../src/middlewares/authenticator';


chai.use(chaiHttp);
let app = null;
let agent = null;

describe('Article API', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  describe('POST /api/v1/articles', () => {
    it('Should return status: 201', (done) => {
      agent.post('/api/v1/articles')
        .set('Authorization', JWT_TOKEN)
        .send(ARTICLE)
        .end((_err, res) => {
          expect(res).to.have.status(201);
          const { body } = res;
          expect(body).should.be.an('object');
          expect(body).to.have.property('status');
          expect(body).to.have.property('message');
          expect(body).to.have.property('data');
          expect(body.status).to.be.equal('success');
          expect(body.data).to.have.property('id');
          expect(body.data).to.have.property('title');
          expect(body.data).to.have.property('slug');
          expect(body.data.title).to.be.equal(ARTICLE.title);
          expect(body.data.body).to.be.equal(ARTICLE.body);
          done();
        });
    });
  });

  describe('Articles Rating Test', () => {
    let article;
    before(async () => {
      article = await Article.findAll();
    });
    describe('handle valid input', () => {
      it('should rate an article', (done) => {
        agent
          .post(`/api/v1/articles/${article[article.length - 1].id}/ratings`)
          .set({ Authorization: Auth.generateToken(userMock.testUser) })
          .send({ rating: 4 })
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(201);
            res.body.status.should.equal('success');
            res.body.data.value.should.equal(4);
            done();
          });
      });

      it('should rate an article', (done) => {
        agent
          .post(`/api/v1/articles/${article[article.length - 1].id}/ratings`)
          .set({ Authorization: Auth.generateToken(userMock.testUser) })
          .send({ rating: 3 })
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.body.status.should.equal('success');
            res.body.data.value.should.equal(3);
            done();
          });
      });
    });

    describe('handle invalid input', () => {
      it('should return error for article rating by the author', (done) => {
        const userArticle = {
          id: '979eaa2e-5b8f-4103-8192-4639afae2ba1',
          userId: '979eaa2e-5b8f-4103-8192-4639afae2bb2',
        };
        agent
          .post(`/api/v1/articles/${userArticle.id}/ratings`)
          .set({ Authorization: Auth.generateToken(userMock.testUser) })
          .send({ rating: 4, userId: userArticle.userId })
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(409);
            res.body.status.should.equal('fail');
            done();
          });
      });
    });
  });

  describe('PUT /api/v1/articles/:id', () => {
    it('Should return status: 202', (done) => {
      agent.put('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7')
        .send(UPDATED_ARTICLE)
        .set('Authorization', JWT_TOKEN)
        .end((_err, res) => {
          const { body } = res;
          expect(res).to.have.status(202);
          expect(body).should.be.an('object');
          expect(body).to.have.property('status');
          expect(body).to.have.property('message');
          done();
        });
    });

    it('Should return status 400 when the article to be updated is malformed or contains invalid field', (done) => {
      agent.put('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7')
        .send(MALFORMED_ARTICLE)
        .set('Authorization', JWT_TOKEN)
        .end((_err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.be.equal('fail');
          done();
        });
    });

    it('Should return status 404 when article id is not found on the database', (done) => {
      agent.put('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba0')
        .send(UPDATED_ARTICLE)
        .set('Authorization', JWT_TOKEN)
        .end((_err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.be.equal('fail');
          done();
        });
    });
    it('Should return status 403 when user attempts to update an article that doesn\'t belong to him/her', (done) => {
      agent.put('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba8')
        .send(UPDATED_ARTICLE)
        .set('Authorization', JWT_TOKEN_AUTHOR)
        .end((_err, res) => {
          const { body } = res;
          expect(res).to.have.status(403);
          expect(body.status).to.be.equal('error');
          done();
        });
    });
    afterEach(async () => {
      await app.close();
      app = null;
      agent = null;
    });
  });
});

describe('DELETE /api/v1/articles/:id', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return status: 202', (done) => {
    agent.delete('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7')
      .set('Authorization', JWT_TOKEN)
      .end((_err, res) => {
        const { body } = res;
        expect(res).to.have.status(202);
        expect(body).should.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.have.property('message');
        done();
      });
  });

  it('Should return status: 403 when user is not the owner of the article', (done) => {
    agent.delete('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba4')
      .set('Authorization', JWT_TOKEN_AUTHOR)
      .end((_err, res) => {
        const { body } = res;
        expect(res).to.have.status(403);
        expect(body).should.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.have.property('message');
        done();
      });
  });

  after(async (done) => {
    app.close();
    app = null;
    done();
  });
});
