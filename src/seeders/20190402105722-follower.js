export default {
  up: queryInterface => queryInterface.bulkInsert(
    'followers',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        followerId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        followerId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('followers', null, {}),
};
