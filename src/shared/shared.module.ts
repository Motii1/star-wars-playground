import { Global, Module } from '@nestjs/common';
import { EnvConfig } from './env-config';
import { DB_CONNECTION } from './db-connection';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from './database';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: EnvConfig,
      useFactory: () => EnvConfig.validateWithLoad(),
    },
    {
      provide: DB_CONNECTION,
      useFactory: (envConfig: EnvConfig) =>
        new Kysely<Database>({
          dialect: new PostgresDialect({
            pool: new Pool({
              host: envConfig.DB_HOST,
              port: envConfig.DB_PORT,
              user: envConfig.DB_USERNAME,
              password: envConfig.DB_PASSWORD,
              database: envConfig.DB_NAME,
            }),
          }),
        }),
      inject: [EnvConfig],
    },
  ],
  exports: [EnvConfig, DB_CONNECTION],
})
export class SharedModule {}
