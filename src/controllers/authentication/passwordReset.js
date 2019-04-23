// import bcrypt from 'bcryptjs';
import { User } from '../../models';
import sendMail from '../../utils/email';
import Auth from '../../middlewares/authenticator';
import { responseFormat, errorResponseFormat } from '../../utils/index';
import { subject, content } from '../../utils/mailContent/passwordReset';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const date = new Date();
    date.setHours(date.getHours() + 24);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json(errorResponseFormat({
        status: 'fail', message: 'Account associated with this email cannot be found'
      }));
    }
    const passwordResetToken = Auth.generateToken({ email });
    const message = content(passwordResetToken);
    const resetInstruction = { email, subject, message };
    await user.update({ passwordResetToken, resetTokenExpires: date });
    sendMail(resetInstruction);
    return res.status(200).json(responseFormat({ status: 'success', data: `Password reset instruction was successfully sent to ${req.body.email}` }));
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const date = new Date();
    const user = await User.findOne({ where: { passwordResetToken: resetToken } });
    if (!user) { return res.status(404).json(errorResponseFormat({ status: 'fail', message: 'Invalid verification token, kindly re-authenticate!' })); }
    const { resetTokenExpires } = user;
    if (resetTokenExpires <= date) return res.status(401).json(errorResponseFormat({ status: 'fail', message: 'Token has expired!' }));

    const { password } = req.body;
    const hashPassword = user.hash(password);
    await user.update({
      password: hashPassword, passwordResetToken: null, resetTokenExpires: null,
    });
    return res.status(200).json(responseFormat({ status: 'success', data: 'Password was successfully updated!' }));
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
};
