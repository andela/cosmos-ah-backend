import { expect } from 'chai';
import { parseErrorResponse, errorResponseFormat } from '../../src/utils';

describe('Util test', () => {
  describe('parseErrorResponse()', () => {
    const responses = {
      email: ['invalid email'],
      password: ['was too short']
    };

    it('should parse error response', () => {
      const errorResponse = parseErrorResponse(responses);
      expect(errorResponse.email).to.equal('invalid email');
      expect(errorResponse.password).to.equal('was too short');
      expect(errorResponse).to.deep.equal({
        email: 'invalid email',
        password: 'was too short'
      });
    });
  });

  describe('errorResponseFormat()', () => {
    it('should return error response', () => {
      const response = errorResponseFormat({ message: 'server is down at the moment' });
      expect(response.status).to.equal('error');
      expect(response.message).to.equal('server is down at the moment');
    });
  });
});
