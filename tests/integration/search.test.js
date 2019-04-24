import chai from 'chai';
import chaiHttp from 'chai-http';
import { search, searchError, searchValidationError } from '../mock/user';
import { startServer } from '../../src/server';

const { expect } = chai;
chai.use(chaiHttp);

describe('Search Test', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return success for cosmos search', (done) => {
    agent
      .post('/api/v1/search/articles')
      .send(search)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('status')
          .eql('success');
        const { body } = res;
        const { data } = body;
        expect(body).should.be.an('object');
        expect(data[0].id).to.eql('979eaa2e-5b8f-4103-8192-4639afae2ba8');
        expect(data[0].title).to.eql('Cosmos group');
        expect(body).to.have.property('data');
        done();
      });
  });

  it('Should return failure for cosmos search', (done) => {
    agent
      .post('/api/v1/search/articles')
      .send(searchError)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body)
          .to.have.property('status')
          .eql('fail');
        expect(body).should.be.an('object');
        expect(body).to.have.property('message').to.eql('No Search Record Found');
        done();
      });
  });

  it('Should return validation error for cosmos search', (done) => {
    agent
      .post('/api/v1/search/articles')
      .send(searchValidationError)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body)
          .to.have.property('status')
          .eql('fail');
        expect(body).should.be.an('object');
        expect(body.message).to.have.property('search').to.eql('The search field is required.');
        done();
      });
  });
});
