import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuardGuard } from '../guards/jwtAuthGuard.guard';
import { INestApplication } from '@nestjs/common';

function setupGlobalAuthGuard(app: INestApplication) {
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new JwtAuthGuardGuard(reflector, jwtService));
}

export default setupGlobalAuthGuard;
