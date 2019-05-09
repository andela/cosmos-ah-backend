import Authenticator from '../../middlewares/authenticator';

const socialRedirect = (req, res) => {
  const { id, email, role, username } = req.user;
  const token = Authenticator.generateToken({ id, email, role, username });
    res.redirect(`https://ah-frontend-stage.herokuapp.com/handlesocialauth?token=${token}`);
    // res.redirect(`http://localhost:9001/handlesocialauth?token=${token}`);
};


export default socialRedirect;
