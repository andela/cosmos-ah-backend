import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Root directory Test', () => {
  it('Should return status: 200', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Should return message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).to.equal('Welcome to the test route');
        done();
      });
  });
  it('Should return object', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
