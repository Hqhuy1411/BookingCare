/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import FcmService from './fcm.service';

@Global()
@Module({
  providers: [FcmService],
  exports: [FcmService],
})
export default class FcmModule {}
