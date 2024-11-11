import IArtist from '../../../artist/models/IArtist';
import Album from '../../../album/models/Album';
import Track from '../../../track/models/Track';

export default interface IFavoritesResponse {
  artists: IArtist[];
  albums: Album[];
  tracks: Track[];
}
