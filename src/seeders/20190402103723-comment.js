export default {
  up: queryInterface => queryInterface.bulkInsert(
    'comments',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb7',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb6',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb5',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb4',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb3',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb2',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb1',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb0',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        body:
            'Put simply, JSend is a specification that lays down some rules for how JSON responses from web servers should be formatted. JSend focuses on application-level (as opposed to protocol- or transport-level) messaging which makes it ideal for use in REST-style applications and APIs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('comments', null, {}),
};
