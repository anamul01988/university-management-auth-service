import { NextFunction, Request, Response } from 'express'
import userService from './users.service'
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('req', req.body)
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    // res.status(400).json({
    //   // success: false,
    //   // message: 'Failed to create user',
    //   // error: error,
    // })
    next(error) //global error handler er kace pathiye dewa holo
  }
}
export default {
  createUser,
}
