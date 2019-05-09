export default {
  up: queryInterface => queryInterface.bulkInsert(
    'articles',
    [
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        title: 'Robotics',
        slug: 'robotics',
        description:
          'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557325101/tech/alex-knight-199368-unsplash.jpg',
        published: true,
        tags: ['tech', 'deep learning'],
        favouritesCount: 500,
        readCount: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba4',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        title: 'New Microsoft Windows Terminal',
        slug: 'windows-terminal',
        description:
          'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557440636/tech/windows-terminal.jpg',
        published: true,
        tags: ['tech', 'terminal', 'microsoft'],
        favouritesCount: 500,
        readCount: 230,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
        userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
        title: 'Life in Andela',
        slug: 'life-in-andela',
        description:
          'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557439207/culture/andela.jpg',
        published: true,
        tags: ['culture', 'andela'],
        favouritesCount: 600,
        readCount: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'afa7ac4d-ca41-4d9f-a55d-3ba9f9c06602',
        userId: 'afa7ac4d-ca41-4d9f-a55d-3ba9f9c06602',
        title: 'The Healthy Programmer',
        slug: 'the-healthy-programmer',
        description:
          'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557439673/health/maxresdefault.jpg',
        published: true,
        tags: ['tech', 'robotics'],
        favouritesCount: 500,
        readCount: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1839374c-53ea-438c-815d-1fe301422830',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        title: 'Effective Time management',
        slug: 'effective-time-management',
        description:
          'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557325589/people/brooke-cagle-609873-unsplash.jpg',
        published: true,
        tags: ['self', 'self development'],
        favouritesCount: 600,
        readCount: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766a',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47a',
        title: 'Mac OS Mojave',
        slug: 'mac-os-mojave',
        description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557439926/tech/mojave.jpg',
        tags: ['tech', 'mac'],
        published: true,
        favouritesCount: 500,
        readCount: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766e',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47c',
        title: 'Paloma and Diego',
        slug: 'paloma-and-diego',
        description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557440162/romance/3idots.jpg',
        published: true,
        tags: ['romance', 'love'],
        favouritesCount: 500,
        readCount: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766f',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47a',
        title: 'about sherlock holmes',
        slug: 'about-sherlock-holmes',
        description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557331070/people/joseph-pearson.jpg',
        published: true,
        tags: ['fiction'],
        favouritesCount: 300,
        readCount: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766d',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47a',
        title: 'Oliver',
        slug: 'oliver',
        description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557325589/people/brooke-cagle.jpg',
        published: true,
        tags: ['people'],
        favouritesCount: 500,
        readCount: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7f6cbad-db13-4531-a0e2-498f1c30766c',
        userId: '7e824eba-2a9e-4933-affa-6a3da937e47a',
        title: 'Sherlock Holmes',
        slug: 'sherlock-holmes',
        description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
        body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        imageUrl: 'https://res.cloudinary.com/dmq014llt/image/upload/v1557331064/people/aaron-burden.jpg',
        published: true,
        tags: ['fiction'],
        favouritesCount: 500,
        readCount: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('articles', null, {}),
};
