import { User as UserEntity } from '../users/entities/user.entity';
declare global {
  namespace Express {
    export interface User extends UserEntity {}
  }
}
