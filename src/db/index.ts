import dbConfig from '@src/configs/db.config';
import serverConfig from '@src/configs/server.config';
import { initModels } from '@src/models';

import { Sequelize } from 'sequelize';

class DB {
  public connection: Sequelize;

  constructor() {
    this.connectDB();
  }

  public async connectDB() {
    try {
      console.log(
        dbConfig.DATABASE_NAME,
        dbConfig.DATABASE_USERNAME,
        dbConfig.DATABASE_PASSWORD,
      );

      this.connection = new Sequelize(
        dbConfig.DATABASE_NAME,
        dbConfig.DATABASE_USERNAME,
        dbConfig.DATABASE_PASSWORD,
        {
          dialect: 'mysql',
        },
      );

      initModels(this.connection);

      await this.sync(this.connection);

      serverConfig.DEBUG('Successfully Connected to the Database');

      return this.connection;
    } catch (error) {
      serverConfig.DEBUG(`Error connecting to the db ${error}`);
    }
  }

  public async sync(connection: Sequelize) {
    await connection.sync({
      force: true,
      //   alter: true,
    });
  }

  public async disconnectDb() {
    try {
      if (this.connection) {
        await this.connection.close();
        serverConfig.DEBUG('DB connections closed successfully');
      } else {
        console.log('failed to close');
      }
    } catch (error) {}
  }
}

export default new DB();
