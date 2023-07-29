import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  description: string;

  @IsEmpty()
  @IsNumber()
  star: number;
}
