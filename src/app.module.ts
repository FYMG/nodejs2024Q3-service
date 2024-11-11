import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, ArtistController, TrackController, AlbumController, FavoritesController],
  providers: [AppService, UserService, ArtistService, TrackService, AlbumService, FavoritesService],
})
export class AppModule {}
