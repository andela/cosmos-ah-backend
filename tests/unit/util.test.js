import { expect } from 'chai';
import {
  parseErrorResponse, errorResponseFormat, generateDummyWords
} from '../../src/utils';

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
      expect(response.message).to.equal('server is down at the moment');
    });
  });

  describe('generateDummyWords()', () => {
    it('should generate same word multiple times', () => {
      generateDummyWords('word', 20).split(' ').length.should.equal(20);
    });

    it('should generate same word multiple times', () => {
      generateDummyWords('word').split(' ').length.should.equal(10);
    });
  });
});
