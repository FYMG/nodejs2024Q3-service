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
import { TrackService } from './track.service';
import TrackResponse from './models/responses/TrackResponse';
import CreateTrackDto from './models/dto/CreateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new track' })
  @ApiResponse({
    status: 201,
    description: 'Track successfully created.',
    type: TrackResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.addTrack(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tracks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tracks.',
    type: [TrackResponse],
  })
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 200,
    description: 'Track found.',
    type: TrackResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.getTrackById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track details' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 200,
    description: 'Track successfully updated.',
    type: TrackResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid UUID format or Invalid input data.',
  })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.trackService.modifyTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove track' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 204, description: 'Track successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.trackService.removeTrack(id);
  }
}
