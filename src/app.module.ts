import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    TrackModule,
    FavoritesModule,
    ArtistModule,
    AlbumModule,
  ],
})
export class AppModule {}
