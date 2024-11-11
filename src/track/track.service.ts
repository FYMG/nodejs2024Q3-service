import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import CreateTrackDto from './models/dto/CreateTrackDto';
import Track from './models/Track';
import { FavoritesService } from '../favorites/favorites.service';
import { t } from '../core/loc';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(t('track-not-found'));
    return track;
  }

  addTrack(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  modifyTrack(id: string, updateTrackDto: CreateTrackDto): Track {
    const track = this.getTrackById(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  removeTrack(id: string): void {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) throw new NotFoundException(t('track-not-found'));
    this.favoritesService.removeTrack(id);
    this.tracks.splice(trackIndex, 1);
  }

  detachArtistFromTracks(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  detachAlbumFromTracks(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
