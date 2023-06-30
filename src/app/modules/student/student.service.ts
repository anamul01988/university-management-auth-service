/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.module';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditon = [];
  if (searchTerm) {
    andConditon.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // console.log('map of filtersData', Object.entries(filtersData));
  if (Object.entries(filtersData).length) {
    andConditon.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // const { page = 1, limit = 10 } = paginationOptions;
  // const skip = (page - 1) * limit;
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andConditon.length > 0 ? { $and: andConditon } : {};
  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSigleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found!');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  /* const name ={
     firstName : "Mezba", <===== updated korar jonno pathale dynamcially handle kora lagbe
     lastName: "Persian"
  }
*/
  // Dynamically handle updating the name fields
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // e.g., `name.firstName`, `name.lastName`
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // e.g., `guardian.firstguardian`, `guardian.lastguardian`
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]; //updatedStudentData[`guardian.motherContactNo'] = guardian[motherContactNo]
      //updateStudentData --> object create --> guardian : {motherContactNo: 018...}
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const nameKey = `localGuardian.${key}`; // e.g., `localGuardian.firstName`, `localGuardian.lastName`
      (updatedStudentData as any)[nameKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSigleStudent,
  updateStudent,
  deleteStudent,
};

//service => controller => route
