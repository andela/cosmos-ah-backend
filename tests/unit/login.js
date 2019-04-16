import 'chai/register-should';
import { expect } from 'chai';
import validateField from '../../src/utils/auth/login';
import { successLogin } from '../mock/login';

describe('validateField()', () => {
  it('should return true if the validation passes', () => {
    const validate = validateField(successLogin);
    validate.then((res) => {
      expect(res.passes()).to.be.equal(true);
    });
  });

  it('should return false if the validation for missing field', () => {
    delete successLogin.email;
    const validate = validateField(successLogin);
    validate.then((res) => {
      expect(res.fails()).to.be.equal(true);
      expect(res.passes()).to.be.equal(false);

      const error = res.errors.all();
      expect(error).should.be.an('object');
      expect(error).to.have.property('email');
    });
  });

  it('should return false if the validation fails due to an invalid field', () => {
    successLogin.email = 'martinsmail';
    successLogin.password = 'abcde';
    const validate = validateField(successLogin);
    validate.then((res) => {
      expect(res.fails()).to.be.equal(true);
      expect(res.passes()).to.be.equal(false);

      const error = res.errors.all();
      expect(error).should.be.an('object');
      expect(error).to.have.property('password');
      expect(error.password).to.be.an('array');
      expect(error.email).to.be.an('array');
    });
  });
});
