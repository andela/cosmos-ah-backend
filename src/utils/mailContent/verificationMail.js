import baseUrl from '../../config/emailConfig';

export const subject = 'Welcome to Authors\' Haven';

export const content = (fullName, id, verificationToken) => `
        <div>
          <p>Hi ${fullName},</p>
          <p>Welcome to Authors Haven, a place to be inspired! Your account was successfully created.</p>
          <p>Please click this <a href=${baseUrl}/api/v1/verify/${id}/${verificationToken}>link</a> to confirm your account.</p>
        </div>`;
