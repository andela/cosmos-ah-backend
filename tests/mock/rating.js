const articleRatings = {
  Rating: {
    ratings: [{
      id: '12345-1234',
      userId: '12039-2000',
      articleId: '2019-2019'
    }],
    findOne(options) {
      return new Promise((resolve) => {
        const { userId, articleId } = options.where;
        const rates = this.ratings.filter(rating => (rating.userId === userId)
          && (articleId === rating.articleId));
        resolve(rates[0] || null);
      });
    }
  }
};
export default articleRatings;
