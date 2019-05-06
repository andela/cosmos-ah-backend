import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import Auth from '../../src/middlewares/authenticator';

chai.use(chaiHttp);


describe('User Reading Stats API Test', () => {
  let app, agent = null;

  beforeEach(async () => {
    app = await startServer(9999);
    agent = chai.request(app);
  });

  it('should return the reading stats of a user', (done) => {
    agent
      .get('/api/v1/user-reading-stats')
      .set('Authorization', Auth.generateToken({ id: '979eaa2e-5b8f-4103-8192-4639afae2ba9' }))
      .end((err, res) => {
        if (err) return done(err);
        const { body } = res;
        res.should.have.status(200);
        body.status.should.equal('success');
        body.data.should.have.property('articles');
        body.data.should.have.property('totalArticleReadCount');
        body.data.totalArticleReadCount.should.be.a('number');
        done();
      });
  });

  it('should return an error if no user is provided', (done) => {
    agent
      .get('/api/v1/user-reading-stats')
      .set('Authorization', Auth.generateToken({ id: '979eaa2e-5b8f-4103-8192-4639afae2ba30' }))
      .end((err, res) => {
        if (err) return done(err);
        const { body } = res;
        res.should.have.status(500);
        body.status.should.equal('error');
        done();
      });
  });

  afterEach(async () => {
    app = await app.close();
    agent = null;
  });
});
