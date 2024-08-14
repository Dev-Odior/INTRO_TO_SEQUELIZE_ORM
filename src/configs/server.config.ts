import { config } from 'dotenv';

import debug from 'debug';

config();

class ServerConfig {
  public PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3009;

  public NODE_ENV = process.env.NODE_ENV;

  public DEBUG = this.NODE_ENV === 'dev' ? debug('dev') : console.log;
}

export default new ServerConfig();
