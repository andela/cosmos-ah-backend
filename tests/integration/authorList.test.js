import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { JWT_TOKEN } from '../mock/user';

const { expect } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('LIST AUTHORS', () => {
  before(async () => {
    app = await startServer(6600);
    agent = chai.request(app);
  });
  it('should list authors', (done) => {
    agent
      .get('/api/v1/authors')
      .set('Authorization', JWT_TOKEN)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
