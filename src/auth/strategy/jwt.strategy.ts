/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: any) => {
        const tokenFromQuery = ExtractJwt.fromUrlQueryParameter('token')(req);
        const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return tokenFromQuery || tokenFromHeader;
      },
      ignoreExpiration: false,
      secretOrKey: 'secrect42',
    });
  }

  async validate(payload: any) {
    return {email :payload.email, id: payload.id};
  }
}
