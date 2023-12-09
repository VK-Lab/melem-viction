import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty()
  @IsEmail()
  public email!: string;

  @ApiProperty()
  @IsString()
  public password!: string;
}
