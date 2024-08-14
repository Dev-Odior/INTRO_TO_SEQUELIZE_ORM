import { User } from '@src/models/user.model';
import { JWTUtils } from '@src/utils/jwt.utils';

class TokenHandler {
  public generateRefreshToken(payload: Partial<User>) {
    const token = JWTUtils.sign(payload, '5d');
    return token;
  }

  public generateAccessToken(payload: Partial<User>) {
    const token = JWTUtils.sign(payload, '1d');
    return token;
  }
}

export default new TokenHandler();
