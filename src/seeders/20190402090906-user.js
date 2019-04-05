export default {
  up: queryInterface => queryInterface.bulkInsert(
    'users',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        fullName: 'Chike Ozulumba',
        email: 'chike@gmail.com',
        username: 'chikeozulumba',
        password: '$2a$10$ijw.0rXSMhzRlBWV1xsEEOOZ3c6sVnVE7TmzttlfwtojXOtPd8hte',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        imageUrl: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        fullName: 'Martins Aloba',
        email: 'martins@gmail.com',
        username: 'martinsaloba',
        password: '$2a$10$ijw.0rXSMhzRlBWV1xsEEOOZ3c6sVnVE7TmzttlfwtojXOtPd8hte',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        imageUrl: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'afa7ac4d-ca41-4d9f-a55d-3ba9f9c06602',
        fullName: 'Martins Aloba',
        email: 'martinss@gmail.com',
        username: 'martinsalobas',
        password: '$2a$10$ijw.0rXSMhzRlBWV1xsEEOOZ3c6sVnVE7TmzttlfwtojXOtPd8hte',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        imageUrl: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'author',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'afa7ac4d-ca41-4d9f-a55d-3ba9f9c06602',
        fullName: 'Martins Aloba',
        email: 'martinss@gmail.com',
        username: 'martinsalobas',
        password: '$2a$10$vZU/3YSDac3JTh53Ti0SPugEi2.6cfl2iBmN/guxiXOAKnxoprcVC',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        imageUrl: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'author',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
