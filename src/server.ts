import express, { Application, Express } from 'express';
import serverConfig from './configs/server.config';
import db from './db';
import routers from './routers';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import systemMiddleware from './middlewares/system.middleware';

import { Server } from 'http';

class App {
  private app: Application;
  private server!: Server;
  private port: number;

  constructor() {
    this.app = express();
    this.port = serverConfig.PORT;

    this.initializeDB();
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routes(this.app);

    const signals = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];

    signals.forEach((signal) => {
      process.on(signal, async (error) => {
        serverConfig.DEBUG(
          `\nReceived signal (${signal}) to terminate the application ${error}`,
        );

        // shut down the server
        await this.shutdown();
      });
    });
  }

  private securityMiddleware(app: Application) {
    app.use(helmet());
    app.use(compression());
    app.use(cors());
  }

  private standardMiddleware(app: Application) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
  }

  private async initializeDB() {
    await db.connectDB();
  }

  private routes(app: Application) {
    app.use(routers);
    app.use(systemMiddleware.errorHandler());
  }

  public async shutdown() {
    try {
      if (this.server) {
        await new Promise<void>((resolve) => {
          this.server.close(() => {
            serverConfig.DEBUG(`App shutdown gracefully`);
            resolve();
          });
        });

        // Close other connections
        await db.disconnectDb();
      }
    } catch (error) {
      serverConfig.DEBUG(`Error shutting down the application ${error}`);
    } finally {
      process.exit(0);
    }
  }

  public start() {
    const port = this.port;
    this.server = this.app.listen(port, () => {
      serverConfig.DEBUG(`server is listening at port ${port}`);
    });
  }
}

const app = new App();
app.start();
