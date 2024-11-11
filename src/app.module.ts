import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  controllers: [AppController, ArtistController, AlbumController],
  providers: [AppService, ArtistService, AlbumService],
  imports: [UserModule, TrackModule, FavoritesModule],
})
export class AppModule {}
