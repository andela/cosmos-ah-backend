export default {
  up: queryInterface => queryInterface.bulkInsert(
    'article_reports',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        description: 'Plagiarism by Sanusi',
        reporterId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        description: 'Plagiarism by Micah',
        reporterId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('article_reports', null, {}),
};
