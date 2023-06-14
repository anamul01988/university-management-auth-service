import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
const createSemester = catchAsync(async (req: Request, res: Response) => {
  // console.log('req', req.body)
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );
  res.status(200).json({
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  createSemester,
};
