import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesResponse } from './models/response/FavoritesResponse';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favService: FavoritesService) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', description: 'Track id' })
  @ApiResponse({
    status: 201,
    description: 'Track added to favorites.',
    type: FavoritesResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 422, description: 'Track not found.' })
  addTrack(@Param('id', new ParseUUIDPipe()) trackId: string) {
    this.favService.addTrackToFavorites(trackId);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiParam({ name: 'id', description: 'Track id' })
  @ApiResponse({ status: 204, description: 'Track removed from favorites.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'Track not found in favorites.' })
  removeTrack(@Param('id', new ParseUUIDPipe()) trackId: string) {
    this.favService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', description: 'Album id' })
  @ApiResponse({
    status: 201,
    description: 'Album added to favorites.',
    type: FavoritesResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 422, description: 'Album not found.' })
  addAlbum(@Param('id', new ParseUUIDPipe()) albumId: string) {
    this.favService.addAlbumToFavorites(albumId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiParam({ name: 'id', description: 'Album id' })
  @ApiResponse({ status: 204, description: 'Album removed from favorites.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'Album not found in favorites.' })
  removeAlbum(@Param('id', new ParseUUIDPipe()) albumId: string) {
    this.favService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', description: 'Artist id' })
  @ApiResponse({
    status: 201,
    description: 'Artist added to favorites.',
    type: FavoritesResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 422, description: 'Artist not found.' })
  addArtist(@Param('id', new ParseUUIDPipe()) artistId: string) {
    this.favService.addArtistToFavorites(artistId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiParam({ name: 'id', description: 'Artist id' })
  @ApiResponse({ status: 204, description: 'Artist removed from favorites.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'Artist not found in favorites.' })
  removeArtist(@Param('id', new ParseUUIDPipe()) artistId: string) {
    this.favService.removeArtistFromFavorites(artistId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'List of all favorites.',
    type: [FavoritesResponse],
  })
  getAllFavorites() {
    return this.favService.getAllFavorites();
  }
}
