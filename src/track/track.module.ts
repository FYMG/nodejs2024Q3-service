import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaService } from '../core/services/prisma/prisma.service';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
  exports: [TrackService],
})
export class TrackModule {}
