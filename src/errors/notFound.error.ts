import { StatusCodes } from 'http-status-codes';
import SystemError from './system.error';

class NotFoundError extends SystemError {
  constructor(message: string) {
    super(message || 'Not found error', StatusCodes.NOT_FOUND);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default NotFoundError;
