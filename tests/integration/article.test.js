import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import ARTICLE from '../mock/article';

const { expect } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

before(async () => {
  app = await startServer(5000);
  agent = chai.request(app);
});

describe('POST /api/v1/articles', () => {
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
});
