import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
// import emailConfig from '../config/emailConfig';

const transporter = nodemailer.createTransport(
  nodemailerSendgrid(
    {
      apiKey: process.env.SENDGRID_API_KEY,
    }
  )
);
const url = 'http://localhost:4000';
const sendMail = (payload) => {
  const fullUrl = `${url}/verify/${payload.secretToken}`;
  const message = `
    <div>
      <p>Hi ${payload.fullName},</p>
      <p>Welcome to Authors Haven, a place to be inspired! Your account was successfully created.</p>
      <p>Please click this <a href=${fullUrl}>${fullUrl}</a> to confirm your account.</p>
    </div>`;

  const mailOptions = {
    from: 'no-reply@authors-haven.com',
    to: payload.email,
    subject: 'Welcome to Authors Haven',
    Html: message
  };
  return transporter.sendMail(mailOptions, (err) => {
    if (err) { return console(err); }
    return console.log(`Verification mail has been sent to ${payload.fullName}`);
  });
};

export default sendMail;
