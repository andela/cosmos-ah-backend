import 'chai/register-should';
import { expect, assert } from 'chai';
import { validateBookmark } from '../../src/utils/bookmark';
import { articleId } from '../mock/bookmark';

describe('validateBookmark()', () => {
  it('should return true if the validation passes', () => {
    const validate = validateBookmark(articleId);
    validate.then((res) => {
      expect(res.passes()).to.be.equal(true);
    });
  });
  it('should return false if the validation for missing article id field', () => {
    const validate = validateBookmark(articleId);
    validate.then((res) => {
      assert.isTrue(res.fails());
    });
  });
});
