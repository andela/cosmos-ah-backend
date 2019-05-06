import Authenticator from '../../middlewares/authenticator';

const socialRedirect = (req, res) => {
  const { id, email, role, username } = req.user;

  const token = Authenticator.generateToken({ id, email, role, username });
  res.cookie('jwt-token', token);
  res.redirect('https://ah-frontend-stage.herokuapp.com');
};


export default socialRedirect;
