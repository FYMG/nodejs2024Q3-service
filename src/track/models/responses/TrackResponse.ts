import { ApiProperty } from '@nestjs/swagger';

export default class TrackResponse {
  @ApiProperty({
    type: String,
    example: 'YourTrackName',
    description: 'Name of the track.',
  })
  name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the artist.',
  })
  artistId: string | null;

  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the album.',
  })
  albumId: string | null;

  @ApiProperty({
    type: Number,
    example: 1251,
    description: 'Duration of the track in seconds.',
  })
  duration: number;
}
