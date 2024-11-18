import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

import { PrismaService } from '../core/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
  exports: [ArtistService],
})
export class ArtistModule {}
