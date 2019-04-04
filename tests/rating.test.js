/* eslint-disable indent */
import 'chai/register-should';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer } from '../src/server';
import { generateMockToken } from '../src/utils';
import { Article } from '../src/models';

chai.use(chaiHttp);

const baseArticleRatingURL = '/api/v1/articles';

describe('Rating API test', () => {
    let app = null;
    let agent = null;

    let article;

    beforeEach('Start server', async () => {
        app = await startServer(5000);
        agent = chai.request(app);
        article = await Article.findByPk('979eaa2e-5b8f-4103-8192-4639afae2ba4');
    });

    afterEach(() => {
        app.close();
        app = null;
    });

    describe('handle valid request', () => {
        it('user can rate an article', (done) => {
            agent
                .post(`${baseArticleRatingURL}/${article.id}/ratings`)
                .set({ Authorization: `${generateMockToken()}` })
                .send({ rating: 5 })
                .end((err, res) => {
                    res.body.success.should.equal(true);
                    done();
                });
        });
    });

    describe('handle invalid request', () => {
        it('user cannot rate same article by the same user', (done) => {
            agent
                .post(`${baseArticleRatingURL}/${article.id}/ratings`)
                .set({ Authorization: `${generateMockToken()}` })
                .send({ rating: 3 })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('cannot rate an article below 1', (done) => {
            agent
                .post(`${baseArticleRatingURL}/${article.id}/ratings`)
                .set({ Authorization: `${generateMockToken()}` })
                .send({ rating: 0 })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('cannot rate an article above 5', (done) => {
            agent
                .post(`${baseArticleRatingURL}/${article.id}/ratings`)
                .set({ Authorization: `${generateMockToken()}` })
                .send({ rating: 7 })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});
