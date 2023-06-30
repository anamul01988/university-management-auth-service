import { Request, Response } from 'express';
// import { StudentService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { Istudent } from './academicSemester.interface';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';
// import { academicSemesterFilterableFields } from './academicSemester.constant';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  // console.log('filters', filters);
  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSigleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved Successfully',
    // meta: result.meta,
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved Successfully',
    // meta: result.meta,
    data: result,
  });
  // next(); /aita lagbe nah curse create er somoy ekbar headers pathaicilam
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted Successfully',
    data: result,
  });
  // next(); /aita lagbe nah curse create er somoy ekbar headers pathaicilam
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
