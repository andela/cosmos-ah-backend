import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

const transporter = nodemailer.createTransport(
  nodemailerSendgrid(
    {
      apiKey: process.env.SENDGRID_API_KEY,
    }
  )
);

const sendMail = (payload) => {
  const mailOptions = {
    from: 'no-reply@authors-haven.com',
    to: payload.email,
    subject: payload.subject,
    Html: payload.message,
  };
  return transporter.sendMail(mailOptions);
};

export default sendMail;
