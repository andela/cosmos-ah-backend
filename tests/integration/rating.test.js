import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import Auth from '../../src/middlewares/authenticator';

chai.use(chaiHttp);

describe('Article rating API', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(9999);
    agent = chai.request(app);
  });

  afterEach(async () => {
    await app.close();
  });

  const user = {
    id: '979eaa2e-5b8f-4103-8192-4639afae2ba8'
  };

  describe('POST /api/v1/articles/:id/ratings', () => {
    describe('handle valid data', () => {
      it('should rate an article', (done) => {
        agent
          .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba8/ratings')
          .set({ Authorization: Auth.generateToken(user) })
          .send({ rating: 4 })
          .end((err, res) => {
            if (err) return done(err);
            res.status.should.equal(201);
            res.body.should.have.property('data');
            res.body.status.should.equal('success');
            res.body.data.value.should.equal(4);
            done();
          });
      });

      it('should update the rating value if article has been rated', (done) => {
        agent
          .post('/api/v1/articles/979eaa2e-5b8f-4103-8192-4639afae2ba8/ratings')
          .set({ Authorization: Auth.generateToken(user) })
          .send({ rating: 5 })
          .end((err, res) => {
            if (err) return done(err);
            res.body.status.should.equal('success');
            res.body.data.value.should.equal(5);
            res.status.should.equal(200);
            done();
          });
      });
    });

    describe('handle invalid data', () => {
      it('should return error if user is the author of the article', (done) => {
        agent
          .post('/api/v1/articles/1839374c-53ea-438c-815d-1fe301422830/ratings')
          .set({ Authorization: Auth.generateToken({ id: '7e824eba-2a9e-4933-affa-6a3da937e47c' }) })
          .send({ rating: 4 })
          .end((err, res) => {
            if (err) return done(err);
            res.status.should.equal(409);
            res.body.status.should.equal('fail');
            res.body.should.have.property('data');
            res.body.data.should.equal('You cannot rate your article');
            done();
          });
      });

      it('should return error if user\'s rating  is below 1', (done) => {
        agent
          .post('/api/v1/articles/1839374c-53ea-438c-815d-1fe301422830/ratings')
          .set({ Authorization: Auth.generateToken({ id: '7e824eba-2a9e-4933-affa-6a3da937e47c' }) })
          .send({ rating: 0 })
          .end((err, res) => {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.status.should.equal('fail');
            res.body.should.have.property('data');
            done();
          });
      });

      it('should return error if user\'s rating  is above 5', (done) => {
        agent
          .post('/api/v1/articles/1839374c-53ea-438c-815d-1fe301422830/ratings')
          .set({ Authorization: Auth.generateToken({ id: '7e824eba-2a9e-4933-affa-6a3da937e47c' }) })
          .send({ rating: 10 })
          .end((err, res) => {
            if (err) return done(err);
            res.status.should.equal(400);
            res.body.status.should.equal('fail');
            res.body.should.have.property('data');
            done();
          });
      });

      it('should return error if user\'s rating  is above 5', (done) => {
        agent
          .post('/api/v1/articles/1839374c-53ea-438c-815d-1fe301422830/ratings')
          .set({ Authorization: Auth.generateToken({ id: '7e824eba-2a9e-4933-affa-6a3da937e47d' }) })
          .send({ rating: 4 })
          .end((err, res) => {
            if (err) return done(err);
            res.status.should.equal(500);
            res.body.status.should.equal('error');
            done();
          });
      });
    });
  });
});
