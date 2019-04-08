import 'chai/register-should';
import { expect } from 'chai';
import { validateArticle } from '../../src/utils/article';
import ARTICLE from '../mock/article';

describe('validateArticle()', () => {
  it('should return true if the validation passes', () => {
    const validate = validateArticle(ARTICLE);
    validate.then((res) => {
      expect(res.passes()).to.be.equal(true);
    });
  });

  it('should return false if the validation fails due to missing field', () => {
    delete ARTICLE.title;
    const validate = validateArticle(ARTICLE);
    validate.then((res) => {
      expect(res.fails()).to.be.equal(true);
      expect(res.passes()).to.be.equal(false);

      const error = res.errors.all();
      expect(error).should.be.an('object');
      expect(error).to.have.property('title');
      expect(error.title).to.be.an('array');
    });
  });

  it('should return false if the validation fails due to an invalid field', () => {
    ARTICLE.title = 1111111111;
    ARTICLE.tags = 1111111111;
    const validate = validateArticle(ARTICLE);
    validate.then((res) => {
      expect(res.fails()).to.be.equal(true);
      expect(res.passes()).to.be.equal(false);

      const error = res.errors.all();
      expect(error).should.be.an('object');
      expect(error).to.have.property('title');
      expect(error.title).to.be.an('array');
      expect(error.tags).to.be.an('array');
    });
  });
});
