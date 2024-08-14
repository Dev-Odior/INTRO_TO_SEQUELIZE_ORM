import authConfig from '@src/configs/auth.config';
import bcrypt from 'bcryptjs';
import { hash } from 'crypto';

export class BcryptUtils {
  static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(parseInt(authConfig.SALT_ROUNDS));
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(hashedPassword: string, password: string) {
    console.log(hashedPassword, password);
    return bcrypt.compareSync(password, hashedPassword);
  }
}
