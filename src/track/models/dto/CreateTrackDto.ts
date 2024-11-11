import { IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateTrackDto {
  @ApiProperty({
    type: String,
    example: 'YourTrackName',
    description: 'Name of the track.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the artist.',
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @ApiProperty({
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the album.',
  })
  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @ApiProperty({
    type: Number,
    example: 1251,
    description: 'Duration of the track in seconds.',
  })
  @IsNumber()
  @Min(1, { message: 'Duration is required' })
  duration: number;
}
