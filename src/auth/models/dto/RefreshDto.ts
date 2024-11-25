import { ApiProperty } from '@nestjs/swagger';

export default class RefreshDto {
  @ApiProperty({
    description: 'refresh token',
    example: 'refreshToken',
  })
  public refreshToken: string;
}
