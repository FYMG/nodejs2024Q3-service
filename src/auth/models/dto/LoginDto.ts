import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({ description: 'user login' })
  @IsString()
  public login: string;

  @ApiProperty({ description: 'user password' })
  @IsString()
  public password: string;
}
