import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  description: string;

  @IsEmpty()
  @IsNumber()
  star: number;
}
