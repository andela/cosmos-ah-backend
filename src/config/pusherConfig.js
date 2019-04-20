import Pusher from 'pusher';

const config = {
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'eu',
  useTLS: true,
  encryptionMasterKey: process.env.ENCRYPTION_MASTER_KEY,
};

const pusher = new Pusher(config);

export default pusher;
