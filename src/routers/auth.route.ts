import AuthController from '@src/controllers/auth.controller';
import systemMiddleware from '@src/middlewares/system.middleware';
import authValidator from '@src/validators/auth.validator';

import { Router } from 'express';

class AuthRoutes extends AuthController {
  router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      '/register',
      systemMiddleware.validateRequestBody(authValidator.register),
      this.register,
    );

    this.router.post(
      '/login',
      systemMiddleware.validateRequestBody(authValidator.login),
      this.login,
    );

    this.router.post('/logout', this.logout);
  }
}

export default new AuthRoutes().router;
