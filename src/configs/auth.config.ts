import { config } from 'dotenv';

config();

class AuthConfigs {
  public JWT_SECRET = process.env.JWT_SECRET;
  public SALT_ROUNDS = process.env.SALT_ROUNDS;
}

export default new AuthConfigs();
