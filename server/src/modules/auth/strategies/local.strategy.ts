import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { UserService } from '@/modules/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      usernameField: 'loginType',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, _: any, password: string) {
    const { loginType, employeeId, email } = req.body;

    if (loginType === 'employeeId' && employeeId) {
      return await this.usersService.verifyByEmployeeId(employeeId, password);
    }

    if (loginType === 'email' && email) {
      return await this.usersService.verifyUser(email, password);
    }

    throw new Error('Invalid login credentials');
  }
}
