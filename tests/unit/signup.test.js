// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { startServer } from '../../src/server';
// import { createUserError } from '../mock/signup';

// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Signup Authentication Error Test', () => {
//   let app = null;
//   let agent = null;

//   before(async () => {
//     app = await startServer(5000);
//     agent = chai.request(app);
//   });

//   it('Should return error for signup route', (done) => {
//     agent
//       .post('/api/v1/signup')
//       .send(createUserError)
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res.body)
//           .to.have.property('full_name')
//           .eql(['The full name field is required.']);
//         done();
//       });
//   });
// });
