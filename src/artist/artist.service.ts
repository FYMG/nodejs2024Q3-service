import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import Artist from './models/Artist';
import { t } from '../core/loc';
import CreateArtistDto from './models/dto/CreateArtistDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumsService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(t('artist-not-found'));
    return artist;
  }

  addArtist(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  modifyArtist(id: string, updateArtistDto: CreateArtistDto): Artist {
    const artist = this.getById(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  removeArtist(id: string): void {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException(t('artist-not-found'));

    this.albumsService.detachArtistFromAlbums(id);
    this.tracksService.detachArtistFromTracks(id);
    this.favoritesService.removeArtist(id);
    this.artists.splice(index, 1);
  }
}
