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

export const sendNotificationMail = async ({ email, subject, html }, from = 'no-reply@authors-haven.com') => {
  try {
    const mailOptions = {
      from,
      to: email,
      subject,
      Html: html,
    };
    const mailSent = await transporter.sendMail(mailOptions);
    return mailSent;
  } catch (error) {
    throw new Error(error);
  }
};

export default sendMail;
