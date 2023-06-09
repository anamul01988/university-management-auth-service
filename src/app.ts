import express, { Application } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
app.use('/api/v1/users/', usersRouter)

//Testing
// app.get('/', async (req: Request, res: Response) => {
//   res.send('Working Successfuly!')
// })
// app.get('/', (req: Request, res: Response) => {
//   throw new ApiError(400, 'ore baba error') //class diye function baniye o error handling kora jay
//   // next('ore baba error') //Error propagate hoye app.js a giye global error handle hoye gelo
// // })
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('ore baba error')
// })
// // global error handler
// // app.use((err, req: request, res: response, next: NextFunction) => {
// //   if (err instanceof Error) {
// //     res.status(400).json({ error: err })
// //   } else {
// //     res.status(500).json({ error: 'Something went wrong' })
// //   }
// // })
// // app.get('/', async (req: Request, res: Response) => {
// //   await usersService.createUser({
// //     id: '999',
// //     password: '1234',
// //     role: 'student',
// //   })
// //   res.send('Working Successfuly!')
// // })
app.use(globalErrorHandler)

export default app
