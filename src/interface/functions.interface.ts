import { Request } from 'express'; // Import the Request type from Express
import { ValidationResult } from 'joi';

export type RequestValidator = (req: Request) => ValidationResult;
