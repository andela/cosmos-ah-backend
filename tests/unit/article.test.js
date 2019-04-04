import 'chai/register-should';
import { expect } from 'chai';
import { validateArticle } from '../../src/utils/article';

const ARTICLE = {
  title: 'Andela is cool 7888',
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
  description: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te.',
  body: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te. Mei volutpat delicatissimi ut, id mollis alienum argumentum has, semper efficiendi sed ea. Ius decore consul forensibus ne, enim verear corpora sit ut. Usu eu possit equidem menandri, quo et noster officiis iracundia.',
  imageUrl: 'https://picsum.photos/200/300',
  tags: ['hello', 'async', 'await']
};
describe('validateArticle()', () => {
  it('should return true if the validation passes', async (done) => {
    const validate = validateArticle(ARTICLE);
    validate.then((res) => {
      expect(res.passes()).to.be.equal(true);
    });
    done();
  });

  it('should return false if the validation fails due to missing field', async (done) => {
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
    done();
  });

  it('should return false if the validation fails due to an invalid field', async (done) => {
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
    done();
  });
});
