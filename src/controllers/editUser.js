import { User } from '../models';
import { responseFormat, errorResponseFormat } from '../utils/index';

export const editUser = async (req, res) => {
  try {
    const { fullName, bio, imageUrl, notification } = req.body;
    const { id } = req.user;
    const updateUser = await User.update({
      fullName,
      bio,
      imageUrl,
      notification }, { returning: true, where: { id } });

    if (updateUser) {
      return res.status(200).json(responseFormat({
        status: 'success',
        data: {
          message: 'User Profile Updated Successfully'
        },
      }));
    }

    return res.status(404).json(errorResponseFormat({
      status: 'error',
      message: 'This User Does not Exist',
    }));
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError') {
      if (error.parent.file === 'uuid.c') {
        return res.status(400).json(errorResponseFormat({
          status: 'error',
          message: 'Invalid userId supplied',
        }));
      }
    }
    return res.status(500).json(errorResponseFormat({
      status: 'error',
      message: 'Something Went Wrong',
    }));
  }
};
