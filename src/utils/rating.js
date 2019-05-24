
/**
 * @function extractRatingValues
 * @param {Array<Object>} ratings
 * @returns {Array<Number>} returns the numerical
 * value of an article rating
 * @description article rating comes with id, value and
 * and other properties. This function extracts the numerical values only
 */
export const extractRatingValues = ratings => ratings.map(rating => rating.value);
