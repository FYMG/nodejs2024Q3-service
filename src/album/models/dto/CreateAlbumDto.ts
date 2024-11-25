import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateAlbumDto {
  @ApiProperty({
    type: String,
    example: 'YourAlbumName',
    description: 'Name of the album.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    example: 2002,
    description: 'Year of the album.',
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'Id of the artist.',
  })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
