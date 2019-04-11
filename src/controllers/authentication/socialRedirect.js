import Authenticator from '../../middlewares/authenticator';

const socialRedirect = (req, res) => {
  const { id, email, role, username } = req.user;

  const token = Authenticator.generateToken({ id, email, role, username });
  res.cookie('jwt-token', token);
  res.redirect('/api/v1');
};


export default socialRedirect;
