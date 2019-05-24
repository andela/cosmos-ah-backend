import { expect } from 'chai';
import {
  parseErrorResponse,
  errorResponseFormat,
  generateDummyWords,
  handleDBErrors,
  checkIDParamType,
  computeArticleRatingTotal,
  computeArticleAverageRating
} from '../../src/utils';
import { invalidArticleUUID } from '../mock/bookmark';
import ratingMock from '../mock/rating';

import Sequelize from '../mock/errors';


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

  describe('checkIDParamType()', () => {
    it('should return true if uuid value is valid', () => {
      const paramsCheck = checkIDParamType('979eaa2e-5b8f-4103-8192-4639afae2ba7');
      expect(paramsCheck).to.equal(true);
    });

    it('should return false if uuid value is invalid as a string', () => {
      const paramsCheck = checkIDParamType('9nme wfkf ekn efknemfkr fekrm fekfm lefm ekwf erfkwerm k');
      expect(paramsCheck).to.equal(false);
    });

    it('should return false if uuid value is invalid as an uuid format', () => {
      const paramsCheck = checkIDParamType(invalidArticleUUID);
      expect(paramsCheck).to.equal(false);
    });
  });

  describe('handleDBerrors', () => {
    const {
      ForeignKeyConstraintError,
      DatabaseError
    } = Sequelize;

    const fkError = new ForeignKeyConstraintError();
    const dbError = new DatabaseError('Database error: table "articles" is not present');

    const req = {
      user: { id: '979eaa2e-5b8f-4103-8192-4639afae2ba' },
      params: { articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba5' }
    };

    it('should return error', () => {
      handleDBErrors(fkError, { req, Sequelize }, (message) => {
        message.should.equal(`userId:${req.user.id} is not present in table "users" or article:${req.params.articleId} is not present in table "articles"`);
      });
    });

    it('should return error', () => {
      handleDBErrors(dbError, { req, Sequelize }, (message) => {
        message.should.equal('Database error: table "articles" is not present');
      });
    });
  });

  describe('computeArticleRatingTotal', () => {
    it('should return an article rating total', () => {
      const { ratings } = ratingMock;
      const totalRating = computeArticleRatingTotal(ratings);
      expect(totalRating).to.equal(8);
    });
  });

  describe('computeArticleAverageRating', () => {
    it('should return an article rating average', () => {
      const { ratings } = ratingMock;
      const averageRating = computeArticleAverageRating(ratings);
      expect(averageRating).to.equal(4);
    });
  });
});
