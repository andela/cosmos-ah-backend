import { Comment } from '../models';
import { validateComment } from '../utils/comment';
import { parseErrorResponse, responseHandler } from '../utils';
import { findById } from '../utils/query';

  export const commentValidation = async (req, res, next) => {
   const validate = await validateComment(req.body);
   if (validate.fails()) {
     const validationErrors = validate.errors.all();
     const errorMessages = parseErrorResponse(validationErrors);
     return res.status(400).json({
       status: 'fail',
       data: errorMessages,
     });
   }
   next();
 };

  export const verifyComment = async (req, res, next) => {
   const { id } = req.params;
   const comment = await findById(Comment, id);
   if (!comment) {
     return responseHandler(res, 404, { status: 'fail', message: 'Comment not found!' });
   }
   const {
     dataValues: { userId: authorId },
   } = comment;
   req.authorId = authorId;
   next();
 };