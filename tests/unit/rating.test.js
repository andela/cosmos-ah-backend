import 'chai/register-should';
import { extractRatingValues } from '../../src/utils/rating';
import ratingMock from '../mock/rating';

describe('extractRatingValues()', () => {
  it('should extract rating values', () => {
    const rating = extractRatingValues(ratingMock.ratings);
    rating.should.deep.equal([3, 5]);
  });
});
