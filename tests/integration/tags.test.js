import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { articleTag } from '../mock/article';
import { JWT_TOKEN } from '../mock/user';

const { expect } = chai;

chai.use(chaiHttp);
let app = null;
let agent = null;

before(async () => {
  app = await startServer(4000);
  agent = chai.request(app);
});

describe('Article Tag  sucess Test', () => {
  it('Should return success for adding tags to an article', () => {
    agent
      .put('/api/v1/articles/tags/979eaa2e-5b8f-4103-8192-4639afae2ba4')
      .set({ Authorization: JWT_TOKEN })
      .send(articleTag)
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body)
          .to.have.property('status')
          .eql('success');
        expect(body).to.have.property('data');
        expect(body.data.tags[0]).to.eql('java');
      });
  });
});
