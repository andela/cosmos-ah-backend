import { generateDummyWords } from '../../src/utils';

export const ARTICLE = {
  title: 'Andela is cool 7888',
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba8',
  description: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te.',
  body: generateDummyWords('lorem', 500),
  imageUrl: 'https://picsum.photos/200/300',
  tags: ['hello', 'async', 'await']
};

export const UPDATED_ARTICLE = {
  title: 'Andela is cool 7888',
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
  description: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te.',
  body: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te. Mei volutpat delicatissimi ut, id mollis alienum argumentum has, semper efficiendi sed ea. Ius decore consul forensibus ne, enim verear corpora sit ut. Usu eu possit equidem menandri, quo et noster officiis iracundia.',
  imageUrl: 'https://picsum.photos/200/300',
  tags: ['hello', 'async', 'await']
};

export const MALFORMED_ARTICLE = {
  title: 'Andela is cool 7888',
  userId: '979eaa2e-5b8f-4103-8192-4639afae2ba9',
  description: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te.',
  body: 'Lorem ipsum dolor sit amet, sit ut dolor alterum, sed malis referrentur cu. Aperiam fabulas eos ea. Sea mazim senserit tincidunt te. Mei volutpat delicatissimi ut, id mollis alienum argumentum has, semper efficiendi sed ea. Ius decore consul forensibus ne, enim verear corpora sit ut. Usu eu possit equidem menandri, quo et noster officiis iracundia.',
  imageUrl: 'https://picsum.photos/200/300',
  tags: 'jh3rfbjhf4jfhrfjh4j'
};

export const articleTag = {
  tags: ['java', 'ruby']
};
