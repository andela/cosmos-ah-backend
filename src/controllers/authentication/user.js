import fetch from 'node-fetch';
import uuid from 'uuid/v4';
import { User } from '../../models';
import Auth from '../../middlewares/authenticator';
import { responseFormat, errorResponseFormat } from '../../utils/index';
import sendMail from '../../utils/email';

/**
 * @description user will be able to create their profile.
 * @param {object} req
 * @param {object}  res
 * @param {object}  next
 * @returns {object|void} response object
 */
export const login = (req, res) => {
  const { id, fullName, bio, email, username, role } = req.user;
  return res.status(200).json(responseFormat({ status: 'success', data: { token: Auth.generateToken({ id, fullName, bio, email, username, role }) }, }));
};

export const createUser = async (req, res) => {
  try {
    const { body } = req;
    const verificationToken = uuid();
    const user = await User.create({ ...body, verificationToken });
    const { id, username, email, role, fullName, bio } = user;

    let url = `http://${process.env.HOST}:${process.env.PORT}/api/v1/verify`;

    if (process.env.NODE_ENV === 'production') { url = `https://${process.env.HOST}:${process.env.PORT}/api/v1/verify`; }

    const verificationUrl = `${url}/${id}/${verificationToken}`;

    const subject = 'Welcome to Authors\' Haven';

    const message = `
      <div>
        <p>Hi ${fullName},</p>
        <p>Welcome to Authors Haven, a place to be inspired! Your account was successfully created.</p>
        <p>Please click this <a href=${verificationUrl}>link</a> to confirm your account.</p>
      </div>`;

    if (user) {
      const verificationPayload = { id, fullName, email, subject, message };
      sendMail(verificationPayload);
      return res.status(201).json(responseFormat({ status: 'success',
        data: { token: Auth.generateToken({ id, fullName, bio, email, username, role }) },
      }));
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.fields.email) { return res.status(409).json(errorResponseFormat({ status: 'fail', message: 'This Email Already Exist' })); }

      if (error.fields.username) { return res.status(409).json(errorResponseFormat({ status: 'fail', message: 'This Username Already Exist' })); }
    }
    return res.status(500).json(errorResponseFormat({ message: 'Something Went Wrong', }));
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { id, verificationToken } = req.params;
    let user = await User.findOne({ where: { id, verificationToken } });
    if (!user) { return res.status(403).json(errorResponseFormat({ status: 'fail', message: 'Invalid token supplied, kindly reauthenticate!', })); }
    user = await user.update({ verified: true, verificationToken: null });
    if (user) { return res.status(202).json(responseFormat({ status: 'success', data: 'Your account was successfully verified!', })); }
  } catch (error) {
    if (error) { return res.status(500).json(errorResponseFormat({ status: 'fail', message: 'We could not verify you at the moment, please try again', })); }
  }
};

export const linkedinUser = (req, res) => {
  // redirecto to linkedin page to initiate authourization process and get authourization code
  res.redirect(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENTID}&redirect_uri=${process.env.BASE_URL}/auth/linkedin/callback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`);
};

export const linkedinCallback = async (req, res) => {
  try {
    // get linkedin user authourization token
    const linkedinToken = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.BASE_URL}/auth/linkedin/callback&client_id=${process.env.LINKEDIN_CLIENTID}&client_secret=${process.env.LINKEDIN_CLIENTSERVICE}`);
    const linkedinTokenResult = await linkedinToken.json();

    /**  get user profile information ( id, firstname, lastname, profile picture)
     with user authourization token */
    const linkedinUserProfile = await fetch('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
      headers: {
        Authorization: `Bearer ${linkedinTokenResult.access_token}` }
    });
    const linkedinUserProfileResult = await linkedinUserProfile.json();

    const firstname = linkedinUserProfileResult.firstName.localized.en_US;
    const lastname = linkedinUserProfileResult.lastName.localized.en_US;
    const LinkedinImageUrl = linkedinUserProfileResult.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
    const linkedinId = linkedinUserProfileResult.id;

    // get user email information with user authourization token
    const linkedinUserEmail = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        Authorization: `Bearer ${linkedinTokenResult.access_token}` }
    });

    const linkedinUserEmailResult = await linkedinUserEmail.json();
    const linkedinEmail = linkedinUserEmailResult.elements[0]['handle~'].emailAddress;

    // signup or signin linkedin authorize user
    const user = await User.findOrCreate({
      where: { email: linkedinEmail },
      defaults: {
        fullName: `${lastname} ${firstname}`,
        email: linkedinEmail,
        username: `${lastname} ${firstname}`,
        imageUrl: LinkedinImageUrl,
        password: linkedinId
      }
    });

    const { id, fullName, email, username, imageUrl } = user[0];
    const token = Auth.generateToken({ id, fullName, email, username, imageUrl });

    res.cookie('jwt-token', token);

    res.redirect('/api/v1');
  } catch (error) {
    return res.status(500).json(errorResponseFormat({
      message: 'Something Went Wrong',
    }));
  }
};
