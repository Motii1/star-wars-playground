import { InternalServerErrorException } from '@nestjs/common';

export class InvalidArgumentException extends InternalServerErrorException {}
