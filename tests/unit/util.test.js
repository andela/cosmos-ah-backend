import { expect } from 'chai';
import Util, {
  parseErrorResponse,
  errorResponseFormat,
  createErrorResponse,
  omitProps
} from '../../src/utils';

import SequelizeMock from '../mock/errors';

describe('Util test', () => {
  describe('parseErrorResponse()', () => {
    const responses = {
      email: ['invalid email'],
      password: ['was too short']
    };

    it('should parse error response', () => {
      const errorResponse = parseErrorResponse(responses);
      expect(errorResponse.email).to.deep.equal(['invalid email']);
      expect(errorResponse.password).to.deep.equal(['was too short']);
      expect(errorResponse).to.deep.equal({
        email: ['invalid email'],
        password: ['was too short']
      });
    });
  });

  describe('errorResponseFormat()', () => {
    it('should return error response', () => {
      const response = errorResponseFormat({ message: 'server is down at the moment' });
      expect(response.message).to.equal('server is down at the moment');
    });
  });

  describe('Util.parseResponse()', () => {
    it('should parse a successful response', () => {
      const parsedResponse = Util.parseResponse({ data: { id: 1, }, responseType: 'success' });
      parsedResponse.should.have.property('status');
      parsedResponse.status.should.equal('success');
      parsedResponse.should.have.property('data');
      parsedResponse.data.id.should.equal(1);
    });

    it('should parse a failure response', () => {
      const parsedResponse = Util.parseResponse({ data: 'errors!', responseType: 'fail' });
      parsedResponse.status.should.equal('fail');
      parsedResponse.should.have.property('data');
      parsedResponse.data.should.equal('errors!');
    });

    it('should parse an error response', () => {
      const parsedResponse = Util.parseResponse({ data: 'invalid request!', responseType: 'error' });
      parsedResponse.status.should.equal('error');
      parsedResponse.should.have.property('message');
      parsedResponse.should.not.have.property('data');
    });
  });

  describe('Util.createErrorResponse', () => {
    it('should create error responses based on the error class', () => {
      const {
        DatabaseError,
        ValidationError,
        ValidationErrorItem,
        ForeignKeyConstraintError
      } = SequelizeMock;
      let errorResponse = createErrorResponse(
        new DatabaseError(), SequelizeMock);
      errorResponse.data.should.equal('Invalid request. please check and try again');
      errorResponse = createErrorResponse(new ValidationError(), SequelizeMock);
      errorResponse.data.should.be.an('array');
      errorResponse = createErrorResponse(new ValidationErrorItem('email is not in the correct format'), SequelizeMock);
      errorResponse.data.should.equal('email is not in the correct format');
      errorResponse = createErrorResponse(new ForeignKeyConstraintError(), SequelizeMock);
      errorResponse.data.should.equal('You may not have supplied all field values that are foreign keys. please check and try again');
    });
  });

  describe('omitProps()', () => {
    it('should omit props', () => {
      omitProps({ id: 1, name: 'Javier' }, ['id']).should.deep.equal({ name: 'Javier' });
    });
  });
});
