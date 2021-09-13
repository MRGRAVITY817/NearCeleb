import { Injectable } from '@nestjs/common';
import { LocalLoginInput, LocalLoginOutput } from './dtos';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email }: LocalLoginInput): Promise<LocalLoginOutput> {
    try {
      const { ok, error, user } = await this.usersService.getUserByEmail({
        email,
      });
      if (!ok) {
        return { ok, error };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return { ok: false, error: 'Cannot log user in' };
    }
  }
}
