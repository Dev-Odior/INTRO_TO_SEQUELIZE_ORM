import Joi, { Schema, ValidationOptions } from 'joi';
import { Request } from 'express';

class BaseValidator {
  private validationOptions: ValidationOptions = {
    // this is to remove all the slashing in my error response
    errors: {
      wrap: {
        label: '',
      },
    },

    // it shows me all the errors
    abortEarly: false,
  };

  protected patterns = {
    phoneNumber: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    '24HTime': /^([01]\d|2[0-3]):([0-5]\d)$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
  };

  public validate(schema: Joi.AnySchema, req: Request) {
    return schema.validate(req.body, this.validationOptions);
  }
}

export default BaseValidator;
