import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';

@Module({
  controllers: [
    AppController,
    ArtistController,
    AlbumController,
    FavoritesController,
  ],
  providers: [AppService, ArtistService, AlbumService, FavoritesService],
  imports: [UserModule, TrackModule],
})
export class AppModule {}
