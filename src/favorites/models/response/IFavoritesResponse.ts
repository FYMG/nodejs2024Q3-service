import IArtist from '../../../artist/models/IArtist';
import IAlbum from '../../../album/models/IAlbum';
import ITrack from '../../../track/models/ITrack';

export default interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
