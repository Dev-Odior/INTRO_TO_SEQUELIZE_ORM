import { User } from '@src/models/user.model';

import authConfig from '@src/configs/auth.config';
import jwt from 'jsonwebtoken';

export class JWTUtils {
  static sign(payload: Partial<User>, expiresIn: string): string {
    return jwt.sign(payload, authConfig.JWT_SECRET, { expiresIn });
  }

  static verify(token: string) {
    return jwt.verify(token, authConfig.JWT_SECRET);
  }
}
