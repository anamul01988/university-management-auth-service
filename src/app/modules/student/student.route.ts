import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/',StudentController.getAllStudents);

router.delete('/:id',router.get('/:id', StudentController.deleteStudent))


router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);


export const StudentRoutes = router;

//middleware --> validateRequest(userZodSchema) => async (req, res, next)
