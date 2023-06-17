import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;

//middleware --> validateRequest(userZodSchema) => async (req, res, next)
