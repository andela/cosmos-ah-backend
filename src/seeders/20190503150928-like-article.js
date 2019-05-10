export default {
  up: queryInterface => queryInterface.bulkInsert(
    'like_articles',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bbc',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('like_articles', null, {}),
};
