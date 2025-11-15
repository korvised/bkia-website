import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { UserService } from '@/modules/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      usernameField: 'type',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, _: any, password: string) {
    const { type, value } = req.body as {
      type: 'email' | 'employeeId';
      value: string;
    };

    if (type === 'employeeId') {
      return await this.usersService.verifyByEmployeeId(value, password);
    }

    if (type === 'email') {
      return await this.usersService.verifyUser(value, password);
    }

    throw new Error('Invalid login credentials');
  }
}
