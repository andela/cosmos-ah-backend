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
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        image_url: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
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
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        image_url: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba3',
        full_name: 'Arya Stark',
        email: 'aryastark@gmail.com',
        username: 'aryastark',
        password: '%RYYT&^UTB*UYT*IUYIU',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        image_url: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'author',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
