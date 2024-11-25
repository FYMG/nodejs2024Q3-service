import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import LoginDto from './models/dto/LoginDto';
import SignupDto from './models/dto/SignupDto';
import RefreshDto from './models/dto/RefreshDto';
import Public from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }

  @Post('login')
  @Public()
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({
    status: 403,
    description: 'Auth failed. Invalid login or password.',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiResponse({ status: 200, description: 'Token refreshed.' })
  @ApiResponse({ status: 401, description: 'Invalid token.' })
  @ApiResponse({ status: 403, description: 'Auth failed.' })
  async refresh(@Body() refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
