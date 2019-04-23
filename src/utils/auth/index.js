import jwt from 'jsonwebtoken';

export const verifyToken = (token, key = process.env.JWTKEY) => {
  try {
    const payload = jwt.verify(token, key);
    return payload;
  } catch (error) {
    throw error;
  }
};
