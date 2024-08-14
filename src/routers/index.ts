import { Router, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import authRoute from './auth.route';

class AllRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(StatusCodes.OK).json({
        message: `Welcome to a simple auth application`,
        version: '1.0.0',
      });
    });

    this.router.use('/auth', authRoute)
  }
}

export default new AllRoutes().router;
