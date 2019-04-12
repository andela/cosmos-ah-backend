import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import Auth from '../../src/middlewares/authenticator';

const user = {
  id: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
  fullName: 'Martins Aloba',
  role: 'admin',
  username: 'martinsaloba'
};

chai.use(chaiHttp);

describe('Article Report API test', () => {
  let app = null;
  let agent = null;
  beforeEach(async () => {
    app = await startServer(6000);
    agent = chai.request(app);
  });
  afterEach(async () => {
    app = null;
    agent = null;
  });
  it('should report an article', (done) => {
    agent
      .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba8/reports')
      .set({ Authorization: Auth.generateToken(user) })
      .send({ description: 'article contains plagiarized content', category: 'plagiarism' })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.status.should.equal('success');
        res.body.data.description.should.equal('article contains plagiarized content');
        res.body.data.reportCategory.should.equal('plagiarism');
        done();
      });
  });

  it('should return a database error for an article that doesn\'t exist', (done) => {
    agent
      .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba/reports')
      .set({ Authorization: Auth.generateToken(user) })
      .send({ description: 'article contains plagiarized content', category: 'plagiarism' })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(500);
        res.body.should.have.property('message');
        res.body.status.should.equal('error');
        done();
      });
  });

  it('should return an error for an invalid request body', (done) => {
    agent
      .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba/reports')
      .set({ Authorization: Auth.generateToken(user) })
      .send({ category: 'plagiarism' })
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(400);
        res.body.status.should.equal('fail');
        res.body.should.have.property('data');
        res.body.data.should.be.an('object');
        res.body.data.description.should.equal('Please supply a description of your report');
        done();
      });
  });
});
