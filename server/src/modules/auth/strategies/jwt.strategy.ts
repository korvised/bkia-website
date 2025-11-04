import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/modules/user';
import { AccessTokenPayload } from '@/types/auth';
import { ConfigService } from '@/common/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const currentUser = await this.userService.findOneById(payload.userId);
    if (!currentUser) {
      throw new UnauthorizedException();
    }

    return currentUser;
  }
}
