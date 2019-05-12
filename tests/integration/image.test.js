import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import { startServer } from '../../src/server';
import { JWT_TOKEN, } from '../mock/user';

const { expect } = chai;
let app = null;
let agent = null;

chai.use(chaiHttp);

describe('POST /image/:category/:mode/:token? </image/articles/upload/userToken?>', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return status: 201 for uploading an image to cloudinary', (done) => {
    agent.post(`/api/v1/image/articles/upload/${JWT_TOKEN}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('files[]', path.resolve(__dirname, '../mock/image.png'), 'image.png')
      .end((_err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Should return status: 500 for uploading an image to cloudinary and field name is not properly set', (done) => {
    agent.post(`/api/v1/image/articles/upload/${JWT_TOKEN}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('file[]', path.resolve(__dirname, '../mock/image.png'), 'image.png')
      .end((_err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });

  after(async (done) => {
    app.close();
    app = null;
    done();
  });
});

describe('DELETE /image/:category/:mode/:token? </image/articles/destroy/>', () => {
  beforeEach(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should return status: 202 for deleting an image that has been uploaded', (done) => {
    agent.delete('/api/v1/image/articles/destroy/')
      .set('Content-Type', 'application/json')
      .send({ file: 'http://res.cloudinary.com/kobe/image/upload/v1557695100/1557695095612/articles/354.jpg' })
      .end((_err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });

  after(async (done) => {
    app.close();
    app = null;
    done();
  });
});
