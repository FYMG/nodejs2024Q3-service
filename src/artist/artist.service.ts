import { Injectable, NotFoundException } from '@nestjs/common';
import { t } from '../shared/loc';
import CreateArtistDto from './models/dto/CreateArtistDto';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.artist.findMany();
  }

  async getById(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException(t('artist-not-found'));
    return artist;
  }

  async addArtist(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async modifyArtist(id: string, updateArtistDto: CreateArtistDto) {
    await this.getById(id);

    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async removeArtist(id: string) {
    const artist = await this.getById(id);
    if (!artist) throw new NotFoundException(t('artist-not-found'));

    await this.prisma.artist.delete({ where: { id } });
  }
}
