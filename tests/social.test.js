import nock from 'nock';
import chai from 'chai';
import strategyCallback from '../src/middleware/strategyCallback';
import { startServer } from '../src/server';

const { expect } = chai;

const accessToken = 'sometoken';
const refreshToken = 'somerefreshtoken';
const profile = {
  id: '1234567890',
  emails: [{ value: 'cosmos@email.com' }],
  displayName: 'cosmos cosmos',
  provider: 'facebook',
  photos: [{ value: 'image' }],
};

nock('https://www.facebook.com/')
  .filteringPath(() => '/api/v1/auth/facebook')
  .get('/api/v1/auth/facebook')
  .reply(200, 'facebook callback route called');

describe('SocialStrategy', () => {
  let app = null;
  let agent = null;

  before(async () => {
    app = await startServer(5000);
    agent = chai.request(app);
  });

  it('Should be A function', (done) => {
    strategyCallback(accessToken, refreshToken, profile, done);
    expect(strategyCallback).to.be.a('function');
  });
  it('should call the social route', async () => {
    const response = await agent.get('/api/v1/auth/facebook');
    expect(response).to.have.status(200);
    expect(response.text).to.be.deep.equal('facebook callback route called');
  });
});
