import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { Request, Response, NextFunction } from 'express';
import { UserInfoService } from 'src/users/services/userInfo.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userInfoService: UserInfoService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const { userInfo, ok } = await this.userInfoService.getUserInfo(
            decoded['id'],
          );
          if (ok) {
            req['user'] = userInfo.user;
          }
        } catch (error) {}
      }
    }
    next();
  }
}
