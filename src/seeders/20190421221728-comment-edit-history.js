export default {
  up: queryInterface => queryInterface.bulkInsert('comment-edit-history', [
    {
      id: '979eaa2e-5b8f-4103-8192-4639afae2bb0',
      commentId: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
      commentBody: 'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '979eaa2e-5b8f-4103-8192-4639afae2bb1',
      commentId: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
      commentBody: 'Put simply, JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('comment-edit-history', null, {})
};
