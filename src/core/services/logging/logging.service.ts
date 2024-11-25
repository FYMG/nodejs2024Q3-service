import { Injectable, Logger, LogLevel } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggingService extends Logger {
  private readonly logFilePath: string;
  private readonly errorLogFilePath: string;
  private readonly maxFileSize: number;

  constructor() {
    super();
    const logDirectory = path.join(__dirname, '..', 'logs');
    this.ensureLogDirectoryExists(logDirectory);

    this.logFilePath = path.join(logDirectory, 'app.log');
    this.errorLogFilePath = path.join(logDirectory, 'error.log');
    this.maxFileSize = parseInt(process.env.LOG_MAX_SIZE || '10485760', 10); // Default to 10MB
  }

  private async ensureLogDirectoryExists(logDirectory: string) {
    try {
      await fs.mkdir(logDirectory, { recursive: true });
    } catch (error) {
      console.error('Error creating log directory:', error);
    }
  }

  async log(message: string, context?: string) {
    super.log(message, context);
    await this.writeLog(this.logFilePath, `[LOG] ${message}`);
  }

  async error(message: string, trace: string, context?: string) {
    super.error(message, trace, context);
    await this.writeLog(this.errorLogFilePath, `[ERROR] ${message}\n${trace}`);
  }

  async warn(message: string, context?: string) {
    super.warn(message, context);
    await this.writeLog(this.logFilePath, `[WARN] ${message}`);
  }

  async debug(message: string, context?: string) {
    if (this.isLogLevelEnabled('debug')) {
      super.debug(message, context);
      await this.writeLog(this.logFilePath, `[DEBUG] ${message}`);
    }
  }

  async verbose(message: string, context?: string) {
    if (this.isLogLevelEnabled('verbose')) {
      super.verbose(message, context);
      await this.writeLog(this.logFilePath, `[VERBOSE] ${message}`);
    }
  }

  private async writeLog(filePath: string, message: string) {
    const logMessage = `${new Date().toISOString()} ${message}\n`;
    try {
      await fs.appendFile(filePath, logMessage);
      await this.rotateLogFile(filePath);
    } catch (error) {
      console.error('Error writing log:', error);
    }
  }

  private async rotateLogFile(filePath: string) {
    try {
      const stats = await fs.stat(filePath);
      if (stats.size > this.maxFileSize) {
        const rotatedFilePath = `${filePath}.${new Date().toISOString()}`;
        await fs.rename(filePath, rotatedFilePath);
        await fs.writeFile(filePath, '');
      }
    } catch (error) {
      console.error('Error rotating log file:', error);
    }
  }

  private isLogLevelEnabled(level: LogLevel): boolean {
    const logLevels = ['error', 'warn', 'log', 'debug', 'verbose'];
    const configuredLevel = process.env.LOG_LEVEL || 'log';
    return logLevels.indexOf(level) <= logLevels.indexOf(configuredLevel);
  }
}
