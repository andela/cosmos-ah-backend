import 'chai/register-should';
import { expect, assert } from 'chai';
import { validateBookmark } from '../../src/utils/bookmark';
import { bookmark } from '../mock/bookmark';

describe('validateBookmark()', () => {
  it('should return true if the validation passes', () => {
    const validate = validateBookmark(bookmark);
    validate.then((res) => {
      expect(res.passes()).to.be.equal(true);
    });
  });
  it('should return false if the validation for missing user id field', () => {
    delete bookmark.userId;
    const validate = validateBookmark(bookmark);
    validate.then((res) => {
      assert.isTrue(res.fails());
    });
  });
  it('should return false if the validation for missing article id field', () => {
    delete bookmark.articleId;
    const validate = validateBookmark(bookmark);
    validate.then((res) => {
      assert.isTrue(res.fails());
    });
  });
});
