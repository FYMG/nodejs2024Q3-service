import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RefreshDto {
  @ApiProperty({
    description: 'refresh token',
    required: true,
    example: 'refreshToken',
  })
  @IsString()
  public refreshToken: string;
}
