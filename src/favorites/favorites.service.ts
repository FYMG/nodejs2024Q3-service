import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { t } from '../shared/loc';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async getAllFavorites() {
    const [favoriteArtists, favoriteAlbums, favoriteTracks] = await Promise.all(
      [
        this.prisma.favoriteArtist.findMany(),
        this.prisma.favoriteAlbum.findMany(),
        this.prisma.favoriteTrack.findMany(),
      ],
    );

    const [artists, albums, tracks] = await Promise.all([
      this.prisma.artist.findMany({
        where: { id: { in: favoriteArtists.map((fav) => fav.artistId) } },
      }),
      this.prisma.album.findMany({
        where: { id: { in: favoriteAlbums.map((fav) => fav.albumId) } },
      }),
      this.prisma.track.findMany({
        where: { id: { in: favoriteTracks.map((fav) => fav.trackId) } },
      }),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtistToFavorites(artistId: string) {
    await this.ensureArtistExists(artistId);
    try {
      return await this.prisma.favoriteArtist.create({ data: { artistId } });
    } catch {
      throw new ConflictException(t('artist-already-in-favorites'));
    }
  }

  async removeArtistFromFavorites(artistId: string) {
    try {
      await this.prisma.favoriteArtist.delete({ where: { artistId } });
    } catch {
      throw new NotFoundException(t('artist-not-in-favorites'));
    }
  }

  async addAlbumToFavorites(albumId: string) {
    await this.ensureAlbumExists(albumId);
    try {
      return await this.prisma.favoriteAlbum.create({ data: { albumId } });
    } catch {
      throw new ConflictException(t('album-already-in-favorites'));
    }
  }

  async removeAlbumFromFavorites(albumId: string) {
    try {
      await this.prisma.favoriteAlbum.delete({ where: { albumId } });
    } catch {
      throw new NotFoundException(t('album-not-in-favorites'));
    }
  }

  async addTrackToFavorites(trackId: string) {
    await this.ensureTrackExists(trackId);
    try {
      return await this.prisma.favoriteTrack.create({ data: { trackId } });
    } catch {
      throw new ConflictException(t('track-already-in-favorites'));
    }
  }

  async removeTrackFromFavorites(trackId: string) {
    try {
      await this.prisma.favoriteTrack.delete({ where: { trackId } });
    } catch {
      throw new NotFoundException(t('track-not-in-favorites'));
    }
  }

  private async ensureArtistExists(artistId: string) {
    try {
      await this.artistService.getById(artistId);
    } catch {
      throw new UnprocessableEntityException(t('artist-never-existed'));
    }
  }

  private async ensureAlbumExists(albumId: string) {
    try {
      await this.albumService.getAlbumById(albumId);
    } catch {
      throw new UnprocessableEntityException(t('album-never-existed'));
    }
  }

  private async ensureTrackExists(trackId: string) {
    try {
      await this.trackService.getTrackById(trackId);
    } catch {
      throw new UnprocessableEntityException(t('track-never-existed'));
    }
  }
}
