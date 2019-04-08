import 'chai/register-should';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { generateDummyWords } from '../../src/utils';
import { 
  validateArticle, 
  computeArticleReadingTime,
  ratingExist,
  isOwnArticle
} from '../../src/utils/article';
import ArticleMock, { ARTICLE } from '../mock/article';
import articleRatingsMock from '../mock/rating';

import { validateRating } from '../../src/middlewares/articles';

const { ArticleModel } = ArticleMock;

chai.use(chaiAsPromised);


describe('Article Utils test', () => {
  describe('Article validation test', () => {
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

    describe('computeArticleReadingTime()', () => {
      describe('handle valid input', () => {
        it('should return an estimated reading time', () => {
          computeArticleReadingTime('code till you drop!').should.equal(1);
        });

        it('should return an estimated reading time', () => {
          computeArticleReadingTime(generateDummyWords('nodejs', 1000)).should.equal(4);
        });

        it('should return an estimated reading time', () => {
          computeArticleReadingTime(generateDummyWords('code', 500)).should.equal(2);
        });
      });

      describe('handle invalid input', () => {
        it('should throw an error if words is not a string', () => {
          (() => computeArticleReadingTime(1)).should.throw(TypeError);
        });

        it('should throw an error if wordsPerMinute is less than 1', () => {
          (() => computeArticleReadingTime(generateDummyWords('grit'), { wordsPerMinute: 0 })).should.throw();
        });
      });
    });

    describe('validateArticleReport()', () => {

    });
  });
});

describe('Article Rating test', () => {
  describe('ratingExist()', () => {
    it('should return true if a rating for an article already exist', () => {
      const ratingsExistForArticle = ratingExist(articleRatingsMock.Rating, {
        userId: '12039-2000',
        articleId: '2019-2019'
      });
      return ratingsExistForArticle.should.eventually.equal(true);
    });

    it('should return false if a rating for an article doesn\'t exist', () => {
      const ratingsExistForArticle = ratingExist(articleRatingsMock.Rating, {
        userId: '12039-2000',
        articleId: '2018-2018'
      });
      return ratingsExistForArticle.should.eventually.equal(false);
    });

    it('should return false if a rating for an article doesn\'t exist', () => {
      const ratingsExistForArticle = ratingExist(articleRatingsMock.Rating, {});
      return ratingsExistForArticle.should.eventually.equal(false);
    });
  });

  describe('isOwnArticle()', () => {
    it('should return a promise', () => {
      const ownArticle = isOwnArticle(ArticleModel, {
        articleId: '22222-22222-2222',
        userId: '33333-3333-3333',
        searchUserId: '33333-3333-3333'
      });
      ownArticle.then.should.be.a('function');
      ownArticle.catch.should.be.a('function');
    });

    it('should return true if an article was authored by the user under test', () => {
      const ownArticle = isOwnArticle(ArticleModel, {
        articleId: '22222-22222-2222',
        userId: '33333-3333-3333',
        searchUserId: '33333-3333-3333'
      });
      return ownArticle.should.eventually.equal(true);
    });

    it('should return false if an article was not authored by the user under test', () => {
      const ownArticle = isOwnArticle(ArticleModel, {
        articleId: '22222-22222-2224',
        userId: '33333-3333-3333',
        searchUserId: '33333-3333-3333'
      });
      return ownArticle.should.eventually.equal(false);
    });
  });

  describe('Article validation test', () => {
    let req;
    let res;
    let next;
    before(() => {
      req = {};
      res = {};
      next = sinon.spy();
      res.status = sinon.fake.returns(res);
      res.json = sinon.fake.returns(res);
    });

    describe('handle invalid inputs', () => {
      it('should return an error for wrong rating value (above max)', () => {
        req.body = {
          rating: 10
        };
        validateRating(req, res, next);
        expect(next.called).to.equal(false);
        expect(res.status.firstCall.args[0].should.equal(400));
      });

      it('should return an error for wrong rating value (below min)', () => {
        req.body = {
          rating: 0
        };
        validateRating(req, res, next);
        expect(next.called).to.equal(false);
      });
    });
  });
});
