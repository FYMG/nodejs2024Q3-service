import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import Favorites from './models/Favorites';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { t } from '../shared/loc';

@Injectable()
export class FavoritesService {
  private favoriteItems: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  getAllFavorites() {
    return {
      artists: this.favoriteItems.artists.map((artistId) =>
        this.artistService.getById(artistId),
      ),
      albums: this.favoriteItems.albums.map((albumId) =>
        this.albumService.getAlbumById(albumId),
      ),
      tracks: this.favoriteItems.tracks.map((trackId) =>
        this.trackService.getTrackById(trackId),
      ),
    };
  }

  addArtistToFavorites(artistId: string) {
    this.ensureArtistExists(artistId);
    if (!this.favoriteItems.artists.includes(artistId)) {
      this.favoriteItems.artists.push(artistId);
    }
  }

  removeArtistFromFavorites(artistId: string) {
    const artistIndex = this.favoriteItems.artists.indexOf(artistId);
    if (artistIndex === -1)
      throw new NotFoundException(t('track-not-in-favorites'));
    this.favoriteItems.artists.splice(artistIndex, 1);
  }

  addAlbumToFavorites(albumId: string) {
    this.ensureAlbumExists(albumId);
    if (!this.favoriteItems.albums.includes(albumId)) {
      this.favoriteItems.albums.push(albumId);
    }
  }

  removeAlbumFromFavorites(albumId: string) {
    const albumIndex = this.favoriteItems.albums.indexOf(albumId);
    if (albumIndex === -1)
      throw new NotFoundException(t('album-not-in-favorites'));
    this.favoriteItems.albums.splice(albumIndex, 1);
  }

  addTrackToFavorites(trackId: string) {
    this.ensureTrackExists(trackId);
    if (!this.favoriteItems.tracks.includes(trackId)) {
      this.favoriteItems.tracks.push(trackId);
    }
  }

  removeTrackFromFavorites(trackId: string) {
    const trackIndex = this.favoriteItems.tracks.indexOf(trackId);
    if (trackIndex === -1)
      throw new NotFoundException(t('track-not-in-favorites'));
    this.favoriteItems.tracks.splice(trackIndex, 1);
  }

  removeArtist(artistId: string) {
    this.favoriteItems.artists = this.favoriteItems.artists.filter(
      (id) => id !== artistId,
    );
  }

  removeAlbum(albumId: string) {
    this.favoriteItems.albums = this.favoriteItems.albums.filter(
      (id) => id !== albumId,
    );
  }

  removeTrack(trackId: string) {
    this.favoriteItems.tracks = this.favoriteItems.tracks.filter(
      (id) => id !== trackId,
    );
  }

  private ensureArtistExists(artistId: string) {
    try {
      this.artistService.getById(artistId);
    } catch {
      throw new UnprocessableEntityException(t('artist-never-existed'));
    }
  }

  private ensureAlbumExists(albumId: string) {
    try {
      this.albumService.getAlbumById(albumId);
    } catch {
      throw new UnprocessableEntityException(t('album-never-existed'));
    }
  }

  private ensureTrackExists(trackId: string) {
    try {
      this.trackService.getTrackById(trackId);
    } catch {
      throw new UnprocessableEntityException(t('track-never-existed'));
    }
  }
}
