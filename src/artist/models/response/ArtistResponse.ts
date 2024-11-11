import { ApiProperty } from '@nestjs/swagger';

export default class ArtistResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the artist.',
  })
  id: string;

  @ApiProperty({
    example: 'YourArtistName',
    description: 'Name of the artist.',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: 'Grammy award for the artist.',
  })
  grammy: boolean;
}