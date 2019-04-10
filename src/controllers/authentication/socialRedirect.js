import Authenticator from '../../middlewares/authenticator';

const socialRedirect = (req, res) => {
  const { id, email, role } = req.user;

  const token = Authenticator.generateToken({ id, email, role });
  res.cookie('jwt-token', token);
  res.redirect('/api/v1');
};


export default socialRedirect;
