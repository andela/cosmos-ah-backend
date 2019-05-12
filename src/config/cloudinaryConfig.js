import cloudinary from 'cloudinary';
import multer from 'multer';
import path from 'path';

const folderLocation = (process.env.DEPLOY_ENV === 'local' || !process.env.DEPLOY_ENV) ? path.resolve(__dirname, '/tmp') : 'app/tmp';
export const fileUpload = multer({ dest: folderLocation }).single('files[]');

const Cloudinary = cloudinary.v2;
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default Cloudinary;
