import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect } = chai;

chai.use(chaiHttp);

describe('Users Login Verification', () => {
  let app = null;
  let agent = null;

  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  const id = '979eaa2e-5b8f-4103-8192-4639afae2ba8';
  const verificationToken = 'c5457f26-959a-488c-9b95-8c320ce2f17e';
  const url = `/api/v1/verify/${id}/${verificationToken}`;

  it('should verify account that has the right credentials', (done) => {
    agent.get(url)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return error for failed verification', (done) => {
    agent.get(url)
      .end((err, res) => {
        expect(res).to.have.status(403);
        const { body } = res;
        expect(body.message).to.be.equal('Invalid token supplied, kindly reauthenticate!');
        done();
      });
  });
});
