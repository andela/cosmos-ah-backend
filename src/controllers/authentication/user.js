import axios from 'axios';
import { User } from '../../models';
import Auth from '../../middlewares/authenticator';
import { responseFormat, errorResponseFormat } from '../../utils/index';
/**
 * @description user will be able to create their profile.
 * @param {object} req
 * @param {object}  res
 * @param {object}  next
 * @returns {object|void} response object
 */
export const login = (req, res) => {
  const {
    id, fullName, bio, email, username, role
  } = req.user;
  return res.status(200).json(responseFormat({
    status: 'success',
    data: {
      token: Auth.generateToken({
        id, fullName, bio, email, username, role
      })
    },
  }));
};

export const createUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.create({ ...body });
    const { id, username, email, role, fullName, bio } = user;

    if (user) {
      return res.status(201).json(responseFormat({
        status: 'success',
        data: {
          token: Auth.generateToken({
            id, fullName, bio, email, username, role
          })
        },
      }));
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.fields.email) {
        return res.status(409).json(errorResponseFormat({
          message: 'This Email Already Exist',
        }));
      }

      if (error.fields.username) {
        return res.status(409).json(errorResponseFormat({
          message: 'This Username Already Exist',
        }));
      }
    }

    return res.status(500).json(errorResponseFormat({
      message: 'Something Went Wrong',
    }));
  }
};

export const linkedinUser = (req, res) => {
  res.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vhpd3l5lnv4z&redirect_uri=http://localhost:4000/api/v1/auth/linkedin/callback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social');

  // get code token from url thorugh https://www.linkedin.com/oauth/v2/accessToken
};

export const linkedinCallback = async (req, res) => {
  console.log(req.query.code);

  const body = {
    client_id: '77vhpd3l5lnv4z',
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: 'http://localhost:4000/api/v1/auth/linkedin/callback',
    client_secret: 'Gl9FuRA0xpZpYf7u'
  };

  try {
    const linkedRes = await axios({
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      method: 'post',
      data: body,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=CUSTOM'
      }
    });
    console.log(linkedRes);
    console.log(body);
  } catch (error) {
    console.log(body);
    console.log(error.response.data);
  }

  // fetch('https://www.linkedin.com/oauth/v2/accessToken', {
  //   method: 'post',
  //   body,
  //   headers: { 'Content-Type': 'application/json' },
  // })
  //   .then(res => res.json())
  //   .then((json) => {
  //     console.log(json);
  //   });

  // const linkedRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
  //   body,
  //   method: 'post',
  //   headers: {
  //     Accept: 'application/json, text/plain, */*',
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },

  // });

  // const content = await linkedRes.json();
  // console.log(content);

  res.status(200).json({
    message: 'welcome to theparams',
  });
};
