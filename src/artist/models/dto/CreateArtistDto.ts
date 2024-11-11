import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Min } from 'class-validator';

export default class CreateArtistDto {
  @ApiProperty({
    example: 'YourArtistName',
    description: 'Name of the artist.',
  })
  @IsString()
  @Min(1, { message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: true,
    description: 'Grammy award for the artist.',
  })
  @IsBoolean()
  grammy: boolean;
}