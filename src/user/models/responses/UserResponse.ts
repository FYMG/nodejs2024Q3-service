import { ApiProperty } from '@nestjs/swagger';
import User from '../User';

type UserResponseType = Omit<User, 'password'>;

export default class UserResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'd82beced-574c-41a9-a7f8-6c2659d3d72e',
    description: 'User id (uuid v4).',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'TestUser',
    description: 'Login for the user account.',
  })
  login: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Version of the user (increments on each update).',
  })
  version: number;

  @ApiProperty({
    type: Number,
    example: 1655000000,
    description: 'Timestamp of the user creation.',
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    example: 1655000000,
    description: 'Timestamp of the last user update.',
  })
  updatedAt: number;
}

export type { UserResponseType };
