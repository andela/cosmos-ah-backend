export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        full_name: 'Chike Ozulumba',
        email: 'chike@gmail.com',
        username: 'chikeozulumba',
        password: '%RYYT&^UTB*UYT*IUYIU',
        bio: 'Hmessaging. More on later.',
        image_url: 'http://waterease.herokuapp.com/images/board/comfort.com',
        notification: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        full_name: 'Martins Aloba',
        email: 'martins@gmail.com',
        username: 'martinsaloba',
        password: '%RYYT&^UTB*UYT*IUYIU',
        bio: 'Hmessaging. More on later.',
        image_url: 'http://waterease.herokuapp.com/images/board/comfort.com',
        notification: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
