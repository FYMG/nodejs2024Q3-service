import { LoggingService } from '../services/logging/logging.service';
import { AllExceptionsFilter } from '../filters/allExceptions.filter';
import { INestApplication } from '@nestjs/common';

function setupGlobalLogging(app: INestApplication) {
  const loggingService = app.get(LoggingService);
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));

  process.on('uncaughtException', (err) => {
    loggingService.error('Uncaught Exception', err.stack, 'Bootstrap');
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', reason as string, 'Bootstrap');
  });
}

export default setupGlobalLogging;
