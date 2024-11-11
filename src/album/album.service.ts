import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import Album from './models/Album';
import { v4 as uuidv4 } from 'uuid';
import { t } from '../shared/loc';
import CreateAlbumDto from './models/dto/CreateAlbumDto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(t('album-not-found'));
    return album;
  }

  addAlbum(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  modifyAlbum(id: string, updateAlbumDto: CreateAlbumDto): Album {
    const album = this.getAlbumById(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  removeAlbum(id: string): void {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) throw new NotFoundException(t('album-not-found'));
    this.trackService.detachAlbumFromTracks(id);
    this.favoriteService.removeAlbum(id);
    this.albums.splice(albumIndex, 1);
  }

  detachArtistFromAlbums(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
