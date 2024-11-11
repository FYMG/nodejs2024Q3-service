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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import UpdatePasswordDto from './models/dto/UpdatePasswordDto';
import CreateUserDto from './models/dto/CreateUserDto';
import UserResponse from './models/responses/UserResponse';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users.',
    type: [UserResponse],
  })
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve user by ID' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully.',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Incorrect old password.' })
  updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid id (incorrect UUID format)',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.delete(id);
  }
}
