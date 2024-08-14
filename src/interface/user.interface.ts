import { RefreshTokenAttributeI } from './refresh.interface';

export interface UserAttributeI {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshTokenId?: number;
  
}
