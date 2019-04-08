
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import Authenticator from '../../src/middlewares/authenticator';

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth', () => {
  const user = {
    id: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
    email: 'raymond@gmail.com',
    username: 'raymond123',
    role: 'admin',
  };

  it('Should generate Token', () => {
    expect(Authenticator.generateToken(user)).to.be.a('string');
    expect(Authenticator.generateToken(user).split('.').length.should.equal(3));
  });

  it('Should not verify an invalid token', () => {
    const req = {
      get() {
        return 'Bearer ';
      }
    };

    const res = {};
    res.json = sinon.fake.returns(res);
    res.status = sinon.fake.returns(res);

    const next = sinon.spy();

    Authenticator.verifyToken(req, res, next);

    expect(next.called).to.equal(false);
    expect(res.json.called).to.equal(true);
    expect(res.json.firstCall.args[0].data).to.equal('No token supplied');
  });

  it('should verify a valid token', () => {
    const token = jwt.sign(user, process.env.JWTKEY);
    const req = {
      get() {
        return `Bearer ${token}`;
      }
    };

    const res = {};
    res.json = sinon.fake.returns(res);
    res.status = sinon.fake.returns(res);

    const next = sinon.spy();

    Authenticator.verifyToken(req, res, next);

    expect(next.called).to.equal(true);
    expect(res.json.called).to.equal(false);
  });

  it('should check if admin', () => {
    const req = {
      user: {
        role: 'admin'
      }
    };

    const res = {};
    res.json = sinon.fake.returns(res);
    res.status = sinon.fake.returns(res);

    const next = sinon.spy();

    Authenticator.isAdmin(req, res, next);

    expect(next.called).to.equal(true);
    expect(res.json.called).to.equal(false);
  });

  it('should check if author', () => {
    const req = {
      decoded: {
        role: 'author'
      }
    };

    const res = {};
    res.json = sinon.fake.returns(res);
    res.status = sinon.fake.returns(res);

    const next = sinon.spy();

    Authenticator.isAuthor(req, res, next);

    expect(next.called).to.equal(true);
    expect(res.json.called).to.equal(false);
  });
});
