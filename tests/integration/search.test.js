import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Search Test', () => {
  let app = null;
  let agent = null;

  before(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return success for cosmos search', (done) => {
    agent
      .get('/api/v1/search/cosmos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('status')
          .eql('success');
        const { body } = res;
        const { searchResults } = body.data;
        expect(body).should.be.an('object');
        expect(body.data)
          .to.have.property('searchResults');
        expect(searchResults[0].id).to.eql('979eaa2e-5b8f-4103-8192-4639afae2ba8');
        expect(searchResults[0].title).to.eql('Cosmos group');
        expect(body).to.have.property('data');
        done();
      });
  });
});
