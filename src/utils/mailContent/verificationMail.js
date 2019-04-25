
export const subject = 'Welcome to Authors\' Haven';

export const content = (fullName, id, verificationToken) => `
        <div>
          <p>Hi ${fullName},</p>
          <p>Welcome to Authors Haven, a place to be inspired! Your account was successfully created.</p>
          <p>Please click this ${process.env.BASE_URL}/verify/${id}/${verificationToken} to confirm your account.</p>
        </div>`;
