import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
// router.post(
//   '/create-user',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createUser
// );
router.post( 
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

// router.post(
//   '/create-faculty',
//   validateRequest(UserValidation.createFacultyZodSchema),
//   UserController.createFaculy
// );

// router.post(
//   '/create-admin',
//   validateRequest(UserValidation.createAdminZodSchema),
//   UserController.createAdmin
// );
export const UserRoutes = router;

//middleware --> validateRequest(userZodSchema) => async (req, res, next)
