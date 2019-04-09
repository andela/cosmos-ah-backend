import { User } from '../models';


const strategyCallback = async (accessToken, refreshToken, profile, done) => {
  const {
    id, displayName, photos, emails
  } = profile;

  const [user] = await User.findOrCreate({
    where: { email: emails[0].value },
    defaults: {
      full_name: displayName,
      password: id,
      email: emails[0].value,
      username: emails[0].value,
      image_url: photos[0].value,
    },
  });
  return done(null, user.dataValues);
};

export default strategyCallback;
