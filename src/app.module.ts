import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    DoctorModule,
    AuthModule,
    UserModule,
    AppointmentModule,
    CommentModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
