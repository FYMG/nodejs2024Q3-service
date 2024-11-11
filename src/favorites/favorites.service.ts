import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import Favorites from './models/IFavorites';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
  ) {}

  removeTrack(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }
}
