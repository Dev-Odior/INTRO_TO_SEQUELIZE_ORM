import { StatusCodes } from 'http-status-codes';
import SystemError from './system.error';

class BadRequestError extends SystemError {
  constructor(message: string) {
    super(message || 'Bad Request Error', StatusCodes.BAD_REQUEST);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BadRequestError;
