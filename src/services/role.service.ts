import { Roles } from '@src/models/roles.model';

class RolesService {
  public async bulkCreateRole(data: string[]) {
    const roles = await Roles.bulkCreate(data);
    console.log(roles, 'this is the role');
    return roles;
  }
}

export default new RolesService();
