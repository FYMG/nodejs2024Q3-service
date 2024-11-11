import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export default class CreateArtistDto {
  @ApiProperty({
    example: 'YourArtistName',
    description: 'Name of the artist.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Grammy award for the artist.',
  })
  @IsBoolean()
  grammy: boolean;
}
