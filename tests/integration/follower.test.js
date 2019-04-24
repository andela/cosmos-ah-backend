import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { testUser, testUser1 } from '../mock/follower';
import Auth from '../../src/middlewares/authenticator';


const { expect } = chai;

chai.use(chaiHttp);
describe('User Following API test', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  afterEach(async () => {
    await app.close();
    agent = null;
  });

  const token = Auth.generateToken(testUser);
  const token1 = Auth.generateToken(testUser1);

  it('Should follow a user successfully', (done) => {
    agent
      .post('/api/v1/followers/979eaa2e-5b8f-4103-8192-4639afae2ba7/follow')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('data').to.be.a('string');
        done();
      });
  });
  it('Should return a success if all followings are returned', (done) => {
    agent
      .get('/api/v1/followings')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('Should return a success if all followers are returned', (done) => {
    agent
      .get('/api/v1/followers')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('Should unfollow a user successfully', (done) => {
    agent
      .post('/api/v1/followers/979eaa2e-5b8f-4103-8192-4639afae2ba7/follow')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('data').to.equal('You have successfully unfollowed this user');
        done();
      });
  });
  it('Should return status 403 if user tries following self', (done) => {
    agent
      .post('/api/v1/followers/979eaa2e-5b8f-4103-8192-4639afae2ba9/follow')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('status').eql('fail');
        expect(res.body).to.have.property('data').to.equal('Sorry, you can not follow yourself');
        done();
      });
  });
  it('Should return an error if user not found in user table', (done) => {
    agent
      .post('/api/v1/followers/979eaa2e-5b8f-4103-8192-4639afae2ba0/follow')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').eql('fail');
        expect(res.body).to.have.property('data').to.equal('This user does not exist');
        done();
      });
  });
  it('Should return an error if user is not following anyone in the followers table', (done) => {
    agent
      .get('/api/v1/followings')
      .set('Authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').eql('fail');
        expect(res.body).to.have.property('data').to.equal('Sorry, you are currently not following any user');
        done();
      });
  });
  it('Should return an error if user has know followers in the followers table', (done) => {
    agent
      .get('/api/v1/followers')
      .set('Authorization', token1)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').eql('fail');
        expect(res.body).to.have.property('data').to.equal('Sorry, know user is currently following you');
        done();
      });
  });
});
