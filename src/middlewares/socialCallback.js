import { User } from '../models';

const strategyCallback = async (accessToken, refreshToken, profile, done) => {
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
        verified: true
      },
    });
    return done(null, user.dataValues);
  } catch (error) {
    throw new Error(error);
  }
};

export default strategyCallback;
