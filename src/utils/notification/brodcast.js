import Socket from 'socket.io';
import engine from 'engine.io';
import { clearNotifications } from '../../services/notifyFollowers';

import { verifyToken } from '../auth';

const io = new Socket();

const options = {
  path: '/api/v1/notifications',
};

engine.Server.prototype.generateId = (req) => {
  try {
    const query = '_query';
    return verifyToken(req[query].authorization.replace('Bearer ', '')).id;
  } catch (error) {
    return false;
  }
};

io.use((socket, next) => {
  if (!socket.id) {
    return next(new Error('Not authorized'));
  }
  next();
});

io.on('connection', (socket) => {
  const { id: socketId } = socket;
  socket.on('clear-notifications', async payload => clearNotifications(payload, socketId));
});

export { io, options };
