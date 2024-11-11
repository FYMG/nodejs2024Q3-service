import IArtist from '../../../artist/models/IArtist';
import IAlbum from '../../../album/models/IAlbum';
import Track from '../../../track/models/Track';

export default interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: Track[];
}
