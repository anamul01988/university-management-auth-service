import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import handleValidationErrors from '../../errors/handleValidationError'
import { IGenericErrorMessage } from '../../interfaces/Error'
import ApiError from '../../errors/ApiError'

const globalErrorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationErrors(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err.message ? [{ path: '', message: err.message }] : []
  } else if (err instanceof Error) {
    message = err.message
    errorMessages = err.message ? [{ path: '', message: err.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler

// const globalErrorHandler = (
//   err,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // if (err instanceof Error) {
//   //   res.status(400).json({ error: err })
//   // } else {
//   //   res.status(500).json({ error: 'Something went wrong' })
//   // }
//   // res.status(400).json({ globalErorHandler: err })

//   let statusCode = 500
//   let message = 'Something went wrong'
//   let errorMessages: IGenericErrorMessage[] = []

//   if (err?.name === 'ValidationError') {
//     const simplifiedError = handleValidationError(err)
//     statusCode = simplifiedError.statusCode
//     message = simplifiedError.message
//     errorMessages = simplifiedError.errorMessages
//   }elseif(err instanceof ApiError){
//       statusCode = err?.statusCode;
//       message = err.message;
//       errorMessages = err?.message ? [{path: '', maessage: err?.message}]: []
//   };

//   elseif (err instanceof Error) {
//     message = err?.message
//     errorMessages = err?.message?
//     [
//       {
//         path: '',
//         message: err?.message
//       }
//     ]: []
//   };

//   res.status().json({
//     success: false,
//     message,
//     errorMessages,
//     stack: config.env !== 'production' ? err?.stack : undefined, //develpment ba product in NODE_ENV er upor dependent
//   })
//   next()
// }
// export default globalErrorHandler

// function elseif(arg0: boolean) {
//   throw new Error('Function not implemented.')
// }
//path:
//message:
