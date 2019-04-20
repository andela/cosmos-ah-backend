export default {
  up: queryInterface => queryInterface.bulkInsert('article_read_histories', [
    {
      id: '979eaa2e-5b8f-4103-8192-4639afae2ba1',
      articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
      userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      id: '979eaa2e-5b8f-4103-8192-4639afae2ba2',
      articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba4',
      userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('article_read_histories', null, {})
};
