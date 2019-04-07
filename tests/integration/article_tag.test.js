import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { updateArticleTag, updateErrorArticleTag } from '../mock/signup';

const { expect } = chai;

chai.use(chaiHttp);

describe('Article update tag test', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return success for updating article tags', (done) => {
    agent
      .patch('/api/v1/articles/tag/979eaa2e-5b8f-4103-8192-4639afae2ba7')
      .send(updateArticleTag)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property('success')
          .eql(true);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return error for updating article tags', (done) => {
    agent
      .patch('/api/v1/articles/tag/979eaa2e-5b8f-4103-8192-4639afae2ba')
      .send(updateArticleTag)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body)
          .to.have.property('success')
          .eql(false);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('Should return error for updating article tags', (done) => {
    agent
      .patch('/api/v1/articles/tag/979eaa2e-5b8f-4103-8192-4639afae2ba7')
      .send(updateErrorArticleTag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('tags')
          .eql(['The tags attribute has errors.']);
        done();
      });
  });
});
