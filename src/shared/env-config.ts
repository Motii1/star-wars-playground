import { Injectable } from '@nestjs/common';
import { plainToInstance, Type } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';

@Injectable()
export class EnvConfig {
  @Type(() => Number)
  @IsNumber()
  PORT = 3000;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @Type(() => Number)
  @IsNumber()
  DB_PORT: number;

  static validateWithLoad() {
    const config = this.load();
    const errors = validateSync(config);
    if (errors.length > 0) {
      throw new Error(
        `Incorrect values for variables: ${errors
          .map((e) => e.property)
          .join(', ')}`,
      );
    }
    return config;
  }

  private static load(): EnvConfig {
    dotenv.config();
    return plainToInstance(EnvConfig, process.env, {
      exposeDefaultValues: true,
    });
  }
}
