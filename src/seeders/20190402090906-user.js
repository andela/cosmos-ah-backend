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
        verified: true,
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
        verified: false,
        verificationToken: 'c5457f26-959a-488c-9b95-8c320ce2f17e',
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
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        fullName: 'Raymond Akalonu',
        email: 'raymond@gmail.com',
        username: 'Raymond',
        password: '$2a$10$vZU/3YSDac3JTh53Ti0SPugEi2.6cfl2iBmN/guxiXOAKnxoprcVC',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        imageUrl: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        fullName: 'Sheyi Say',
        email: 'seyi@gmail.com',
        username: 'seyishay',
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
        id: '146fa633-98dd-467f-9e4d-48eac3ee14e4',
        fullName: 'Simple Mart',
        email: 'simple@mailinator.com',
        username: 'simplemart',
        password: '$2y$10$N9JKEBqy0MUi7bH1a07/pOWBLj2Me9UTAAM56qBH54lSzxdvV4Dxe',
        bio:
            "Hold on now, aren't there already specs for this kind of thing? - Well... no. While there are a few handy specifications for dealing with JSON data, most notably Douglas Crockford's JSONRequest proposal, there's nothing to address the problems of general application-level messaging. More on this later.",
        imageUrl: 'http://waterease.herokuapp.com/images/board/comfort.jpg',
        notification: true,
        role: 'author',
        verified: true,
        passwordResetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbXBsZUBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTU1NTUxNTAyOSwiZXhwIjoxNTg3MDcyNjI5fQ.wDB5SzRAdZEJ5EITaqwhPZtcMNlkP6mLy7Kh1oWC7ms',
        resetTokenExpires: new Date(new Date().setDate(new Date().getDate() + 2)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
