import { Strategy } from 'passport-facebook';
import bcrypt from 'bcryptjs';
import passportConfig from '../config/passportConfig';
import db from '../db_api/models';

const { User } = db;

const facebookStrategy = new Strategy(
  passportConfig.facebookAuth,
  async (accessToken, refreshToken, profile, done) => {
    const {
      id, displayName, photos, emails
    } = profile;

    if (!emails) {
      const userWithNoEmail = { noEmail: true };
      return done(null, userWithNoEmail);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(id, salt);
    const [user] = await User.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        full_name: displayName,
        password: hashPassword,
        email: emails[0].value,
        username: emails[0].value,
        image_url: photos[0].value,
      },
    });
    return done(null, user.dataValues);
  },
);

export default facebookStrategy;
