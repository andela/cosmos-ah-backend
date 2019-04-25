import 'chai/register-should';
import chai, { expect } from 'chai';
import io from 'socket.io-client';
import chaiHttp from 'chai-http';
import { startServer } from '../../src/server';
import { ARTICLE, } from '../mock/article';
import { JWT_TOKEN, JWT_TOKEN_AUTHOR, } from '../mock/user';

chai.use(chaiHttp);

let app = null;
let socket = null;
let agent = null;

describe('real time notifications', () => {
  before(async () => {
    app = await startServer(9999);
    agent = chai.request(app);
  });

  it('should get connection error "not authorized"', async () => {
    const error = await new Promise((res) => {
      socket = io('http://localhost:9999',
      {
        path: '/api/v1/notifications',
        transports: ['false', 'websocket'],
        query: {
          authorization: 'wrong token'
        },
        transportOptions: {
          polling: {
            extraHeaders: {}
          }
        }
      });
      socket.on('error', data => res(data));
    });
    expect(error).to.equal('Not authorized');
  });

  it('should connect well', async () => {
    const response = await new Promise((res) => {
      socket = io('http://localhost:9999', {
        path: '/api/v1/notifications',
        transports: ['false', 'websocket'],
        query: {
          authorization: JWT_TOKEN_AUTHOR,
        },
        transportOptions: {
          polling: {
            extraHeaders: {},
          },
        },
      });
      socket.on('connect', () => res('connection successful'));
    });

    expect(response).to.equal('connection successful');
  });

  it('Should return status: 201', (done) => {
    agent
      .post('/api/v1/articles')
      .set('Authorization', JWT_TOKEN)
      .send(ARTICLE)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});
