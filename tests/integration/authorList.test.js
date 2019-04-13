import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import LOGIN from '../mock/login';

const { expect } = chai;
let app = null;
let agent = null;
let userToken;

chai.use(chaiHttp);

describe('LIST AUTHORS', () => {
  beforeEach(async () => {
    app = await startServer(6600);
    agent = chai.request(app);
  });
  it('login User', (done) => {
    agent
      .post('/api/v1/login')
      .send(LOGIN)
      .end((err, res) => {
        const { token } = res.body.data;
        userToken = token;
        done();
      });
  });
  it('should list authors', (done) => {
    const jwt = `Bearer ${userToken}`;
    agent
      .get('/api/v1/authors')
      .set('Authorization', jwt)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
