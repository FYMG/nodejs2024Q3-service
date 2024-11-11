import Artist from '../../../artist/models/Artist';
import Album from '../../../album/models/Album';
import Track from '../../../track/models/Track';

export default interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
