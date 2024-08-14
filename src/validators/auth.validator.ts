import Joi, { ValidationResult } from 'joi';
import BaseValidator from '.';

import { Request } from 'express';

class AuthValidator extends BaseValidator {
  constructor() {
    super();
  }

  public register = (req: Request): ValidationResult => {
    const schema = Joi.object({
      name: Joi.string().min(4).required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string()
        .min(8)
        .regex(this.patterns.password)
        .required()
        .messages({
          'string.empty': 'password is required',
        })
        .label('Password'),
      roles: Joi.array().items(Joi.string()).min(1).required(),
    });

    return this.validate(schema, req);
  };

  public login = (req: Request): ValidationResult => {
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
    });

    return this.validate(schema, req);
  };
}

export default new AuthValidator();
