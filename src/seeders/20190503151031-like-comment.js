export default {
  up: queryInterface => queryInterface.bulkInsert(
    'like_comments',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        commentId: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        commentId: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb7',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        commentId: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('like_comments', null, {}),
};
