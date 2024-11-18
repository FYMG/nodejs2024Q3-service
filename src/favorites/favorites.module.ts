import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
