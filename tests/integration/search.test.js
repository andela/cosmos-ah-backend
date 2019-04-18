import chai from 'chai';
import chaiHttp from 'chai-http';
import { search, searchError } from '../mock/user';
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

  it('Should return success for cosmos search', (done) => {
    agent
      .post('/api/v1/search/articles')
      .send(searchError)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property('status')
          .eql('fail');
        const { body } = res;
        const { data } = body;
        expect(body).should.be.an('object');
        expect(data).to.have.property('message').to.eql('No Search Record found');
        done();
      });
  });
});
