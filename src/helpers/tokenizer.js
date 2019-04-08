import jwt from 'jsonwebtoken';

export default payload => jwt.sign(payload, 'secret', { expiresIn: '365d' });
