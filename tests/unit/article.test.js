import 'chai/register-should';
import { expect } from 'chai';
import { generateDummyWords } from '../../src/utils';
import { validateArticle, computeArticleReadingTime } from '../../src/utils/article';
import { ARTICLE } from '../mock/article';


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
