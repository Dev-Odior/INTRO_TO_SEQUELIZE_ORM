import { RequestValidator } from '@src/interface/functions.interface';
import Joi from 'joi';

import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

class SystemMiddleware {
  public errorHandler(): ErrorRequestHandler {
    return (err, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof Joi.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'validation error',
          errors: err.details.map((err) => {
            return err.message;
          }),
        });
      }

      return res.send(`this is the error ${err}`);
    };
  }

  public validateRequestBody(validator: RequestValidator) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = validator(req);

      if (error) throw error;

      req.body = value;
      next();
    };
  }
}

export default new SystemMiddleware();
