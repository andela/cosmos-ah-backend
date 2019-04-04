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
const url = 'localhost:4000';
const sendMail = (payload) => {
  const message = `
    <div>
      <p>Hi ${payload.full_name},</p>
      <p>Welcome to Authors Haven, a place to be inspired! Your account was successfully created.</p>
      <p>Please click this link <a href="${url}/verify/${payload.secretToken}"> to confirm your account.</p>
    </div>`;

  const mailOptions = {
    from: 'no-reply@authors-haven.com',
    to: payload.email,
    subject: 'Welcome to Authors Haven',
    Html: message
  };
  return transporter.sendMail(mailOptions, (err) => {
    if (err) { return console(err); }
    return console.log(`Verification mail has been sent to ${payload.full_name}`);
  });
};

export default sendMail;
