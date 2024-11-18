import { Injectable, NotFoundException } from '@nestjs/common';
import { t } from '../shared/loc';
import CreateAlbumDto from './models/dto/CreateAlbumDto';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(t('album-not-found'));
    return album;
  }

  async addAlbum(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async modifyAlbum(id: string, updateAlbumDto: CreateAlbumDto) {
    await this.getAlbumById(id);
    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async removeAlbum(id: string) {
    const album = await this.getAlbumById(id);
    if (album) {
      return this.prisma.album.delete({ where: { id } });
    }
  }
}
