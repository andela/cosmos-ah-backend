import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { UPDATED_ARTICLE, ARTICLE, MALFORMED_ARTICLE } from '../mock/article';
import { JWT_TOKEN, JWT_TOKEN_AUTHOR } from '../mock/user';

const { expect } = chai;
let app = null;
let agent = null;


chai.use(chaiHttp);


describe('POST /api/v1/articles', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

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

  after(async (done) => {
    app.close();
    app = null;
    done();
  });
});

describe('PUT /api/v1/articles/:id', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

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
    agent.put('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba1')
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

  after(async (done) => {
    app.close();
    app = null;
    done();
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
