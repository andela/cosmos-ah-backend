export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Notifications',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb9',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        message:
            'There are lots of web services out there providing JSON data, and each has its own way of formatting responses. Also, developers writing for JavaScript? front-ends continually re-invent the wheel on communicating data from their servers. While there are many common patterns for structuring this data, there is no consistency in things like naming or types of responses.',
        url: 'n-979eaa2e-5b8f-4103-8192-4639afae2bb9',
        notificationState: 'read',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb8',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        message:
            'There are lots of web services out there providing JSON data, and each has its own way of formatting responses. Also, developers writing for JavaScript? front-ends continually re-invent the wheel on communicating data from their servers. While there are many common patterns for structuring this data, there is no consistency in things like naming or types of responses.',
        url: 'n-979eaa2e-5b8f-4103-8192-4639afae2bb8',
        notificationState: 'read',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2bb3',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        message:
            'There are lots of web services out there providing JSON data, and each has its own way of formatting responses. Also, developers writing for JavaScript? front-ends continually re-invent the wheel on communicating data from their servers. While there are many common patterns for structuring this data, there is no consistency in things like naming or types of responses.',
        url: 'n-979eaa2e-5b8f-4103-8192-4639afae2bb3',
        notificationState: 'read',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {}),
};
