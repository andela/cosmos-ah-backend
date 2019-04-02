export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'highlights',
      [
        {
          id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
          userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
          articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
          highlightedText: 'jhefbfjebfjerhfkberfjkbefkjrbfrkefb',
          comment: 'Makes sense, Cosmos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
          userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
          articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
          highlightedText: 'jhefbfjebfjerhfkberfjkbefkjrbfrkefb',
          comment: 'Makes sense, Cosmos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('highlights', null, {}),
};
