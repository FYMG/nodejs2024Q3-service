import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    example: 'YourLogin',
    description: 'Login for the user account.',
  })
  @IsString()
  @MinLength(1, { message: 'Login is required' })
  login: string;

  @ApiProperty({
    example: 'YourPassword',
    description: 'Password for the user account.',
  })
  @IsString()
  @MinLength(6, { message: 'Password is required' })
  password: string;
}
