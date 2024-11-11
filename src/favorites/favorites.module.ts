import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [forwardRef(() => TrackModule)],
  exports: [FavoritesService],
})
export class FavoritesModule {}
