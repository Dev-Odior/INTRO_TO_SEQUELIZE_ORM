import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import { User } from './user.model';

import { RolesAttributeI } from '@src/interface/role.interface';

export class Roles
  extends Model<InferAttributes<Roles>, InferCreationAttributes<Roles>>
  implements RolesAttributeI
{
  declare id: CreationOptional<number>;

  declare role: string;

  declare userId: number;

  declare readonly roles?: Roles[];
}

export const init = (sequelize: Sequelize) => {
  Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, paranoid: true, tableName: 'roles' },
  );
};

export const associations = () => {
  Roles.belongsTo(User, { foreignKey: 'userId' });
};
