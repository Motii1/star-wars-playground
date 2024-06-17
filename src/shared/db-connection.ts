import { Inject } from '@nestjs/common';

export const DB_CONNECTION = Symbol('DB_CONNECTION');

export const InjectDbConnection = () => Inject(DB_CONNECTION);
