import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { JWT_TOKEN } from '../mock/user';

const { expect } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('LIKE ARTICLE', () => {
  beforeEach(async () => {
    app = await startServer(6600);
    agent = chai.request(app);
  });

  it('should like an article', (done) => {
    agent
      .patch('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7/like')
      .set('Authorization', JWT_TOKEN)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.Like).to.equal(1);
        done();
      });
  });

  it('should unlike an article', (done) => {
    agent
      .patch('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba7/like')
      .set('Authorization', JWT_TOKEN)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.data.Like).to.equal(0);
        done();
      });
  });

  it('should respond with error invalid Article ID', (done) => {
    agent
      .patch('/api/v1/articles/7/like')
      .set('Authorization', JWT_TOKEN)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
