import { ApiProperty } from '@nestjs/swagger';

export default class AlbumResponse {
  @ApiProperty({
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the album.',
  })
  id: string;

  @ApiProperty({
    example: 'YourAlbumName',
    description: 'Name of the album.',
  })
  name: string;

  @ApiProperty({
    example: 2002,
    description: 'Year of the album.',
  })
  year: number;

  @ApiProperty({
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the artist.',
  })
  artistId: string;
}
