import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import { RefreshTokenAttributeI } from '@src/interface/refresh.interface';
import { User } from './user.model';

export class RefreshToken
  extends Model<
    InferAttributes<RefreshToken>,
    InferCreationAttributes<RefreshToken>
  >
  implements RefreshTokenAttributeI
{
  declare id: CreationOptional<number>;

  declare token: string;

  declare userId: number;
}

export const init = (sequelize: Sequelize) => {
  RefreshToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      tableName: 'refreshToken',
      sequelize,
    },
  );
};

export const associations = () => {
  RefreshToken.belongsTo(User, { foreignKey: 'userId' });
};
