import { IsString, MaxLength, MinLength } from 'class-validator';
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
  @MinLength(3, { message: 'Password is required' })
  @MaxLength(35, { message: 'Password is too long' })
  password: string;
}
