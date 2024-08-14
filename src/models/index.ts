import { Sequelize } from 'sequelize';
import {
  init as initUser,
  associations as userAssociation,
} from './user.model';

import {
  init as initRefreshToken,
  associations as refreshTokenAssociation,
} from './refreshToken.model';

import {
  init as initRoles,
  associations as rolesAssociation,
} from './roles.model';

export const initModels = (sequelize: Sequelize) => {
  initUser(sequelize);
  initRefreshToken(sequelize);
  initRoles(sequelize);
  associations();
};

const associations = () => {
  userAssociation();
  refreshTokenAssociation();
  rolesAssociation();
};
