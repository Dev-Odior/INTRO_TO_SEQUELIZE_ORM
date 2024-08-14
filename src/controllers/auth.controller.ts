import { NextFunction, Response, Request } from 'express';
import authService from '@src/services/auth.service';

import { StatusCodes } from 'http-status-codes';
import { Roles } from '@src/models/roles.model';
import roleService from '@src/services/role.service';

class AuthController {
  protected async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.getUserForLogin(req.body);
      return res.status(StatusCodes.OK).json({
        message: 'logged in successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  protected logout(req: Request, res: Response, next: NextFunction) {
    res.send('logout');
  }

  protected async register(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        body: { roles, ...others },
      } = req;

      const { user, accessToken, refreshToken } = await authService.create({
        ...others,
      });

      const roleWithId = roles.map((role: string) => {
        return { role, userId: user.id };
      });

      const updateRole = await roleService.bulkCreateRole(roleWithId);

      return res.status(StatusCodes.OK).json({
        message: 'user created successfully',
        data: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
