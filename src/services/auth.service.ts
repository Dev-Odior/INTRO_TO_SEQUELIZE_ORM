import BaseService from '.';
import { Sequelize } from 'sequelize';

import { BadRequestError, NotFoundError } from '@src/errors';

import { User } from '@src/models/user.model';
import { RefreshToken } from '@src/models/refreshToken.model';

import tokenServices from './token.services';
import { BcryptUtils } from '@src/utils/bcrypt.utils';
import { JWTUtils } from '@src/utils/jwt.utils';

class AuthService extends BaseService {
  constructor() {
    super();
  }

  public async getUserForLogin(data: Partial<User>) {
    const { email, password } = data;

    const user = await this.get(email);

    if (!user || !this.verifyPassword(user.password, password)) {
      throw new BadRequestError('Email or password is not correct');
    }

    const checkRefreshToken = await RefreshToken.findOne({
      where: { userId: user.id },
    });

    const validRefreshToken = JWTUtils.verify(checkRefreshToken.token);

    if (!validRefreshToken) {
      const newRefreshToken = tokenServices.generateRefreshToken(user);
      await RefreshToken.update(
        { token: newRefreshToken },
        {
          where: {
            userId: user.id,
          },
        },
      );
    }

    const accessToken = tokenServices.generateAccessToken({
      email: user.email,
      id: user.id,
    });

    const refreshToken = await RefreshToken.findOne({
      where: { userId: user.id },
    });

    return {
      user: this.removePassword(user),
      accessToken,
      refreshToken: refreshToken.token,
    };
  }

  public async verifyPassword(hashedPassword: string, password: string) {
    const verify = BcryptUtils.comparePassword(hashedPassword, password);
    return verify;
  }

  private async get(email: string, withError = false) {
    const user = await User.scope('withPassword').findOne({
      where: { email: email },
    });

    if (!user && withError) {
      throw new BadRequestError('User not found');
    }

    return user;
  }

  private async getUser(email: string, withError = false) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user && withError) {
      throw new NotFoundError('No user found');
    }

    return user;
  }

  private removePassword(data: Partial<User>) {
    const { password, ...withoutData } = data.toJSON();
    return { ...withoutData };
  }

  public async create(data: Partial<User>) {
    const { email } = data;
    
    const exits = await this.getUser(email);

    if (exits) {
      throw new BadRequestError('User already exists');
    }

    const newUser = await User.create(data);

    const accessToken = tokenServices.generateAccessToken({
      email: newUser.email,
    });

    const refreshToken = tokenServices.generateRefreshToken({
      email: newUser.email,
    });


    await RefreshToken.create({
      token: refreshToken,
      userId: newUser.id,
    });

    return { user: this.removePassword(newUser), accessToken, refreshToken };
  }
}

export default new AuthService();
