import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { UserAttributeI } from '@src/interface/user.interface';

import { RefreshToken } from './refreshToken.model';

import { Roles } from './roles.model';

import { BcryptUtils } from '@src/utils/bcrypt.utils';

export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements UserAttributeI
{
  declare id: CreationOptional<number>;

  declare name: string;

  declare email: string;

  declare password: string;

  declare readonly refreshToken?: RefreshToken;
}

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: 'users',
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
      hooks: {
        beforeCreate(user) {
          if (user.password) {
            const password = user.password;
            const hashedPassword = BcryptUtils.hashPassword(password);
            user.password = hashedPassword;
          }
        },
      },
    },
  );
};

export const associations = () => {
  User.hasOne(RefreshToken, { foreignKey: 'userId' });
  User.hasMany(Roles, { foreignKey: 'userId' });
};
