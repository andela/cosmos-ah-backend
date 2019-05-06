import Auth from '../../middlewares/authenticator';
import { responseFormat } from '../../utils/index';

const socialRedirect = (req, res) => {
  const { id, email, role, username } = req.user;

  return res.status(200).json(responseFormat({ status: 'success', data: { token: Auth.generateToken({ id, email, role, username }) }, }));
};


export default socialRedirect;
