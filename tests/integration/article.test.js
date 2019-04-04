import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';

const { expect } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

before(async () => {
  app = await startServer(5000);
  agent = chai.request(app);
});

const article = {
  title: 'Andela is cool 7888',
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
  description: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te.',
  body: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te. Mei volutpat delicatissimi ut, id mollis alienum argumentum has, semper efficiendi sed ea. Ius decore consul forensibus ne, enim verear corpora sit ut. Usu eu possit equidem menandri, quo et noster officiis iracundia.',
  imageUrl: 'https://picsum.photos/200/300',
  tags: ['hello', 'async', 'await']
};
describe('POST /api/v1/articles', () => {
  it('Should return status: 201', (done) => {
    agent.post('/api/v1/articles')
      .send(article)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).should.be.an('object');
        expect(res.body).to.have.property('title');
        expect(res.body.title).to.be.a('string');
        expect(res.body.tags).to.be.a('array');
        done();
      });
  });
});
