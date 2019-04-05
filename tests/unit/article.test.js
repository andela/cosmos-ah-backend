import 'chai/register-should';
import { expect } from 'chai';
import { validateArticle } from '../../src/utils/article';
import { ARTICLE } from '../mock/article';

describe('validateArticle()', () => {
  it('should return true if the validation passes', async () => {
    const validate = await validateArticle(ARTICLE);
    expect(validate.passes()).to.be.equal(true);
  });

  it('should return false if the validation fails due to missing field', async () => {
    delete ARTICLE.title;
    const validate = await validateArticle(ARTICLE);
    expect(validate.fails()).to.be.equal(true);
    expect(validate.passes()).to.be.equal(false);

    const error = validate.errors.all();
    expect(error).should.be.an('object');
    expect(error).to.have.property('title');
    expect(error.title).to.be.an('array');
  });

  it('should return false if the validation fails due to an invalid field', async () => {
    ARTICLE.title = 1111111111;
    ARTICLE.tags = 1111111111;
    const validate = await validateArticle(ARTICLE);
    expect(validate.fails()).to.be.equal(true);
    expect(validate.passes()).to.be.equal(false);

    const error = validate.errors.all();
    expect(error).should.be.an('object');
    expect(error).to.have.property('title');
    expect(error.title).to.be.an('array');
    expect(error.tags).to.be.an('array');
  });
});
