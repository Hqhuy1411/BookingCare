/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';

export class JwtStrategyGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
