import { User } from '../models';
import Auth from './authenticator';

const strategyCallback = async (accessToken, refreshToken, profile, done) => {
  const {
    id, displayName, photos, emails, username
  } = profile;

  const user = await User.findOrCreate({
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
};


// const loggedinUser = user[0].dataValues;
// console.log(Auth.generateToken({ id, displayName, username }));


// return done(null, loggedinUser);
const loggedinUser = user[0].dataValues;

const token = Auth.generateToken({
  id: loggedinUser.id,
  fullName: loggedinUser.fullName,
  email: loggedinUser.email,
  username: loggedinUser.username,
  imageUrl: loggedinUser.imageUrl,
  bio: loggedinUser.bio,
  role: loggedinUser.HTMLTableRowElement,
  isNew: user[0].isNewRecord,
});


return done(null, token);


export default strategyCallback;
