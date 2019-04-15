import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Password Reset', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(6100);
    agent = chai.request(app);
  });

  const resetToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXBsZUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTU1NTUxNTAyOSwiZXhwIjoxNTg3MDcyNjI5fQ.wDB5SzRAdZEJ5EITaqwhPZtcMNlkP6mLy7Kh1oWC7ms';
  const url = `/api/v1/password-reset/${resetToken}`;

  it('should send password reset instruction to user', (done) => {
    const payload = { email: 'chike@gmail.com' };
    agent.post('/api/v1/forgot-password')
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { body } = res;
        expect(body.data).to.be.equal(`Password reset instruction was successfully sent to ${payload.email}`);
        done();
      });
  });

  it('should return error for invalid email address', (done) => {
    agent.post('/api/v1/forgot-password')
      .send({ email: 'chike2@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        const { body } = res;
        expect(body.message).to.be.equal('Account associated with this email cannot be found');
        done();
      });
  });

  it('should return error for invalid token', (done) => {
    agent.put('/api/v1/password-reset/49876jkghdfvghj-dguye89063478-efdvuk789')
      .send({
        password: 'tyie56H#JJJ88',
        password_confirmation: 'tyie56H#JJJ88'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        const { body } = res;
        expect(body.message).to.be.equal('Invalid verification token, kindly re-authenticate!');
        done();
      });
  });

  it('should return error for failed field validation', (done) => {
    agent.put(url)
      .send({
        password: 'newpasswword'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should update password', (done) => {
    agent.put(url)
      .send({
        password: 'tyie56H#JJJ88',
        password_confirmation: 'tyie56H#JJJ88'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        const { body } = res;
        expect(body.data).to.be.equal('Password was successfully updated!');
        done();
      });
  });
});
