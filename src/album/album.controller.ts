import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import AlbumResponseDto from './models/response/AlbumResponse';
import CreateAlbumDto from './models/dto/CreateAlbumDto';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumsService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Albums found.',
    type: [AlbumResponseDto],
  })
  getAll() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiParam({ name: 'id', description: 'Album id' })
  @ApiResponse({
    status: 200,
    description: 'Album found.',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({
    status: 201,
    description: 'Album created successfully.',
    type: AlbumResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.addAlbum(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album info' })
  @ApiParam({ name: 'id', description: 'Album id' })
  @ApiResponse({
    status: 200,
    description: 'Album updated successfully.',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID) or input.',
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    return this.albumsService.modifyAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', description: 'Album id' })
  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.albumsService.removeAlbum(id);
  }
}
