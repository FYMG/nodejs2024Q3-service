import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdatePasswordDto {
  @ApiProperty({
    example: 'YourOldPassword',
    description: 'Old password for the user.',
  })
  @IsString()
  @MinLength(1, { message: 'Old password is required' })
  oldPassword: string;

  @ApiProperty({
    example: 'YourNewPassword',
    description: 'New password for the user.',
  })
  @IsString()
  @MinLength(1, { message: 'New password is required' })
  newPassword: string;
}
