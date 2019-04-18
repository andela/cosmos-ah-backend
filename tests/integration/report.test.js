import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import Auth from '../../src/middlewares/authenticator';

chai.use(chaiHttp);

describe('Article Report API test', () => {
  const user = {
    id: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
    fullName: 'Martins Aloba',
    role: 'admin',
    username: 'martinsaloba'
  };

  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(8000);
    agent = chai.request(app);
  });

  afterEach(async () => {
    await app.close();
    agent = null;
  });

  describe('handle valid input', () => {
    it('should report an article', (done) => {
      agent
        .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba8/escalate')
        .set({ Authorization: Auth.generateToken(user) })
        .send({ description: 'article contains plagiarized content', category: 'plagiarism' })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.status.should.equal('success');
          res.body.data.should.have.property('message');
          done();
        });
    });
  });

  describe('handle invalid input', () => {
    it('should return a database error for an article that doesn\'t exist', (done) => {
      agent
        .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba/escalate')
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
        .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba/escalate')
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

    it('should return an error for a user that does not exist', (done) => {
      agent
        .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba5/escalate')
        .set({ Authorization: Auth.generateToken({ id: '979eaa2e-5b8f-4103-8192-4639afae2ba1' }) })
        .send({ category: 'plagiarism', description: 'hello' })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(500);
          res.body.status.should.equal('error');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
