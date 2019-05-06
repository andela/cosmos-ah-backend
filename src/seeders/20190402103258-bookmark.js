export default {
  up: queryInterface => queryInterface.bulkInsert(
    'bookmarks',
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
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c307bb7',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c307bb5',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c307bb4',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c307bb3',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: 'a7f6cbad-db13-4531-a0e2-498f1c30766d',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c307bb2',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: 'a7f6cbad-db13-4531-a0e2-498f1c30766e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766a',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: 'a7f6cbad-db13-4531-a0e2-498f1c30766a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766b',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: 'a7f6cbad-db13-4531-a0e2-498f1c30766a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766c',
        userId: 'cd5bb9a0-270d-4b1f-88e7-605de02a4b03',
        articleId: 'a7f6cbad-db13-4531-a0e2-498f1c30766a',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('bookmarks', null, {}),
};
