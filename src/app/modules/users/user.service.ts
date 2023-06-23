import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated increamental id
  const academicSemester = {
    code: '01',
    year: '2025',
  };
  // const id = await generateStudentId(academicSemester);
  const id = await generateFacultyId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  // console.log('users', user)
  const createdUser = await User.create(user);
  if (!createUser) {
    // throw new Error('Failed to create user') //it was generic error now  i will use api class error
    throw new ApiError(400, 'Failed to create user'); //it was generic error now  i will use api class error
  }
  return createdUser;
};
export const UserService = {
  createUser,
};
