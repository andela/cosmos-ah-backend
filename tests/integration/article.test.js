import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import ARTICLE from '../mock/article';
import commentOnHighlight from '../mock/highlightComment';

const { expect } = chai;

chai.use(chaiHttp);


describe('POST ARTICLES', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });
  it('Should return status: 201', (done) => {
    agent.post('/api/v1/articles')
      .send(ARTICLE)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        const { body } = res;
        expect(body).should.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.have.property('message');
        expect(body).to.have.property('data');
        expect(body.status).to.be.equal(true);
        expect(body.data).to.have.property('id');
        expect(body.data).to.have.property('title');
        expect(body.data).to.have.property('slug');
        expect(body.data.title).to.be.equal(ARTICLE.title);
        expect(body.data.body).to.be.equal(ARTICLE.body);
        done();
      });
  });


  it('Should comment on highlighted article', (done) => {
    agent.post('/api/v1/comment/highlight-text')
      .send(commentOnHighlight)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const { body } = res;
        expect(body).should.be.an('object');
        expect(body).to.have.property('status');
        expect(body).to.have.property('data');
        expect(body.status).to.be.equal('success');
        expect(body.data).to.have.property('highlightedText');
        expect(body.data).to.have.property('comment');
        done();
      });
  });
});
