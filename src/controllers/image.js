import Cloudinary from '../config/cloudinaryConfig';
import { verifyToken as verifyUserToken } from '../utils/auth/index';
import {
  responseHandler,
} from '../utils';

const handleImageLocationByToken = (jwt) => {
  try {
    const decodeToken = verifyUserToken(jwt.replace('Bearer ', ''));
    return decodeToken.id;
  } catch (error) {
    return new Date().getTime();
  }
};

export const imageUploadHandler = async (req, res) => {
  const { file } = req;
  const { params: { mode, token, category } } = req;
  const userId = handleImageLocationByToken(token);
  if (mode === 'upload') {
    try {
      const fileName = file.originalname.split('.')[0];
      const folderName = token ? `${userId}/${category}` : `default/${category}`;
      const upload = await Cloudinary.uploader.upload(file.path, { public_id: `${folderName}/${fileName}`, tags: `${userId}, ${category}` });
      const { url } = upload;
      const response = { files: [{ url, }] };
      return responseHandler(res, 201, { ...response });
    } catch (error) {
      return responseHandler(res, 500, null);
    }
  }
};

export const imageDestroyHandler = async (req, res) => {
  try {
    const { params: { mode, category } } = req;
    const { body: { file } } = req;
    if (mode === 'destroy' && file) {
      if (file.length > 500) {
        return responseHandler(res, 200, null);
      }
      const delimeter = `/${category}/`;
      const getPublicId = file.split(delimeter);
      const getPublicIdStart = getPublicId[0].split('/').slice(-1).pop();
      const getPublicIdEnd = getPublicId[1].split('.')[0];
      const publicId = decodeURIComponent(`${getPublicIdStart}${delimeter}${getPublicIdEnd}`);
      await Cloudinary.uploader.destroy(publicId);
      return responseHandler(res, 202);
    }
  } catch (error) {
    return responseHandler(res, 500);
  }
};
