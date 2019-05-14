import { User } from '../models';

const strategyCallback = async (accessToken, refreshToken, profile, done, res) => {
  const { id, displayName, photos, emails } = profile;

  try {
    const [user] = await User.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        fullName: displayName,
        password: id,
        email: emails[0].value,
        username: emails[0].value,
        imageUrl: photos[0].value,
      },
    });
    return done(null, user.dataValues);
  } catch (error) {
    return res.redirect('https://ah-frontend-stage.herokuapp.com/login');
  }
};

export default strategyCallback;
