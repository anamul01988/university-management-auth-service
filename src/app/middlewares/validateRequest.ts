import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      // res.status(400).json({
      //   // success: false,
      //   // message: 'Failed to create user',
      //   // error: error,
      // })
      next(error); //global error handler er kace pathiye dewa holo
    }
  };
export default validateRequest;
