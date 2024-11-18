import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { t } from '../shared/loc';
import CreateArtistDto from './models/dto/CreateArtistDto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AlbumService))
    private albumsService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    return this.prisma.artist.findMany();
  }

  async getById(id: string) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async addArtist(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: {
        id: uuidv4(),
        ...createArtistDto,
      },
    });
  }

  async modifyArtist(id: string, updateArtistDto: CreateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async removeArtist(id: string) {
    const artist = await this.getById(id);
    if (!artist) throw new NotFoundException(t('artist-not-found'));

    await this.albumsService.detachArtistFromAlbums(id);
    await this.tracksService.detachArtistFromTracks(id);
    await this.favoritesService.removeArtist(id);
    await this.prisma.artist.delete({ where: { id } });
  }
}
