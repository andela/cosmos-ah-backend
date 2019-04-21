import 'chai/register-should';
import sinon from 'sinon';
import { trimBody } from '../../src/middlewares';

describe('Middlewares tests', () => {
  describe('trimBody', () => {
    it('should trim request body', () => {
      const req = {
        body: { name: 'Micah   ', cohort: '    46' }
      };
      const res = {};
      const next = sinon.spy();
      trimBody(req, res, next);
      req.body.should.deep.equal({ name: 'Micah', cohort: '46' });
      next.called.should.equal(true);
    });

    it('should trim request body', () => {
      const req = {
        body: { name: '   Micah ', seenGot: true }
      };
      const res = {};
      const next = sinon.spy();
      trimBody(req, res, next);
      req.body.should.deep.equal({ name: 'Micah', seenGot: true });
      next.called.should.equal(true);
    });
  });
});
