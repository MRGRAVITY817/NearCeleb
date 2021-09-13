import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/services/users.service';
import { AllowedRoles } from '../decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // Getting a key for roles
    const roles = this.reflector.get<AllowedRoles>(
      'roles', // it should be same name from one created by metadata
      context.getHandler(),
    );
    // If there is no metadata, it should be public
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user, error, ok } = await this.usersService.getUserById({
          id: decoded['id'],
        });
        // If there is metadata, but if the user is invalid, then false
        if (!user) {
          return false;
        }
        gqlContext['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }
        return roles.includes(user.userInfo.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
