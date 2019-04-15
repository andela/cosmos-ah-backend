import baseUrl from '../../config/emailConfig';

export const subject = 'Password Reset Instruction';

export const content = resetToken => `
        <div>
          <p>Hi, </p>
          <p>You requested for password reset for your account</p>
          <p>Please click on the following link, or paste the link in your browser to complete this process within four hours of receiving this email.</p>
          <p>${baseUrl}/api/v1/password-reset/${resetToken}</p>
          <p>If you did not request for this, please ignore this email.</p>
        </div>`;
