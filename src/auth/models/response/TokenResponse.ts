import { ApiProperty } from '@nestjs/swagger';

export default class TokensResponse {
  @ApiProperty({
    type: String,
    format: 'jwt',
    description: 'access token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    format: 'jwt',
    description: 'refresh token',
  })
  refreshToken: string;
}
