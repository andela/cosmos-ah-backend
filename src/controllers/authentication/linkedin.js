import passport from 'passport';
// import { Strategy as LinkedinStrategy } from 'passport-linkedin-api-v2';
import { LinkedinAuth } from 'passport-linkedin-api-v2';

const linkedinHandshake = passport.authenticate('linkedin');

const linkedinStrategy = new LinkedinAuth(
  {
    clientID: '77vhpd3l5lnv4z',
    clientSecret: 'Gl9FuRA0xpZpYf7u',
    callbackURL: 'http://localhost:4000/api/v1/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true,
  },
  // queries goes in here
  (token, tokenSecret, profile, done) => done(null, profile),
);
const linkedinCallback = passport.authenticate('linkedin', {
  failureRedirect: '/login',
});
// (req,res)=>{
//     //suucess
//     res.redirect('/')
// }

export { linkedinHandshake, linkedinCallback, linkedinStrategy };
