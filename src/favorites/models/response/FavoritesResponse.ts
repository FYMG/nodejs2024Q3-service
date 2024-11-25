import { ApiProperty } from '@nestjs/swagger';
import TrackResponse from '../../../track/models/responses/TrackResponse';
import AlbumResponse from '../../../album/models/response/AlbumResponse';
import ArtistResponse from '../../../artist/models/response/ArtistResponse';

export class FavoritesResponse {
  @ApiProperty({
    example: [],
    description: 'List of favorite artists.',
  })
  artists: ArtistResponse[];

  @ApiProperty({
    example: [],
    description: 'List of favorite albums.',
  })
  albums: AlbumResponse[];

  @ApiProperty({
    example: [],
    description: 'List of favorite tracks.',
  })
  tracks: TrackResponse[];
}
