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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import ArtistResponseDto from './models/response/ArtistResponse';
import { ArtistService } from './artist.service';
import CreateArtistDto from './models/dto/CreateArtistDto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistsService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'List of artists.',
    type: [ArtistResponseDto],
  })
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 200,
    description: 'Artist found.',
    type: ArtistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({
    status: 201,
    description: 'Artist created successfully.',
    type: ArtistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.addArtist(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist info' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 200,
    description: 'Artist updated successfully.',
    type: ArtistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID or input.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.modifyArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.artistsService.removeArtist(id);
  }
}
