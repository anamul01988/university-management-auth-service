import { RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    });
  }
);
export const UserController = {
  createUser,
};

// import { RequestHandler } from 'express';
// import { UserService } from './user.service';
// const createUser: RequestHandler = async (req, res, next) => {
//   try {
//     // console.log('req', req.body)
//     const { user } = req.body;
//     const result = await UserService.createUser(user);
//     res.status(200).json({
//       success: true,
//       message: 'user created successfully',
//       data: result,
//     });
//   } catch (error) {
//     // res.status(400).json({
//     //   // success: false,
//     //   // message: 'Failed to create user',
//     //   // error: error,
//     // })
//     next(error); //global error handler er kace pathiye dewa holo
//   }
// };
// export const UserController = {
//   createUser,
// };
