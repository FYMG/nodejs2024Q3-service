import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateTrackDto from './models/dto/CreateTrackDto';

import { FavoritesService } from '../favorites/favorites.service';
import { t } from '../shared/loc';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(t('track-not-found'));
    return track;
  }

  async addTrack(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({
      data: createTrackDto,
    });
  }

  async modifyTrack(id: string, updateTrackDto: CreateTrackDto) {
    await this.getTrackById(id);

    return this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async removeTrack(id: string) {
    const track = await this.getTrackById(id);
    if (track) {
      return this.prisma.track.delete({ where: { id } });
    }
  }
}
