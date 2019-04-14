const bookmark = {
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
  articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7'
};

const invalidUserIdBookmark = {
  userId: '979eaa2e-5b8f-4103-8192-4639afae2239',
  articleId: '979eaa2e-5b8f-4103-8192-4639afae2ba7'
};
const invalidArticleIdBookmark = {
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
  articleId: '979eaa2e-5b8f-4103-8192-4639afae2777'
};
const invalidUUIDBookmark = {
  userId: 'XXXXXXX--XXXX',
  articleId: '979eaa2e-5b8f-4103-8192-4639afae2777'
};
export { bookmark, invalidUserIdBookmark, invalidArticleIdBookmark, invalidUUIDBookmark };
