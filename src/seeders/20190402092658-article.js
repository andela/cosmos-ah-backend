export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'articles',
      [
        {
          id: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
          userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
          title: 'Cosmos group',
          slug: 'cosmos-group',
          description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          imageUrl: 'https://picsum.photos/200/300',
          tagList: 'true, false',
          tags: ['true', 'false'],
          likes: ['979eaa2e-5b8f-4103-8192-4639afae2ba9'],
          rating: JSON.stringify([
            { user: '979eaa2e-5b8f-4103-8192-4639afae2ba9', value: 5 },
          ]),
          favouritesCount: 500,
          readCount: 230,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '979eaa2e-5b8f-4103-8192-4639afae2ba7',
          userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
          title: 'Cosmos group all',
          slug: 'cosmos-group-all',
          description:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          body:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
          imageUrl: 'https://picsum.photos/200/300',
          tagList: 'true, false',
          tags: ['true', 'false'],
          likes: ['979eaa2e-5b8f-4103-8192-4639afae2ba9'],
          rating: JSON.stringify([
            { user: '979eaa2e-5b8f-4103-8192-4639afae2ba9', value: 5 },
          ]),
          favouritesCount: 500,
          readCount: 230,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('articles', null, {}),
};
