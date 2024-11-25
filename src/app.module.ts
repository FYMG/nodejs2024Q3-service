import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { PrismaService } from './core/services/prisma/prisma.service';
import { LoggingService } from './core/services/logging/logging.service';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggingService],
  imports: [
    UserModule,
    TrackModule,
    FavoritesModule,
    ArtistModule,
    AlbumModule,
  ],
})
export class AppModule {}
