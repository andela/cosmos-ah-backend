// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { startServer } from '../../src/server';
// import { search } from '../mock/user';

// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Search Error Test', () => {
//   let app = null;
//   let agent = null;

//   before(async () => {
//     app = await startServer(3000);
//     agent = chai.request(app);
//   });
//   it('Should return success for cosmos search', (done) => {
//     agent
//       .post('/api/v1/search/articles')
//       .send(search)
//       .end((err, res) => {
//         expect(res).to.have.status(404);
//         expect(res.body)
//           .to.have.property('status')
//           .eql('fail');
//         const { body } = res;
//         const { data } = body;
//         expect(body).should.be.an('object');
//         expect(body).to.have.property('data');
//         expect(data).to.have.property('message').to.eql('No Search Record found');
//       });
//     done();
//   });
// });
