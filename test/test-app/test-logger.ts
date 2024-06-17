import { LoggerService } from '@nestjs/common';

/* eslint-disable @typescript-eslint/no-unused-vars */

export class TestLogger implements LoggerService {
  debug(message: unknown): void {}

  verbose(message: unknown): void {}

  log(message: unknown): void {}

  error(message: unknown): void {}

  warn(message: unknown): void {}
}
