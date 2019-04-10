export default {
  up: queryInterface => queryInterface.bulkInsert(
    'report',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        description: 'Plagiarism by Sanusi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        description: 'Plagiarism by Micah',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('report', null, {}),
};
