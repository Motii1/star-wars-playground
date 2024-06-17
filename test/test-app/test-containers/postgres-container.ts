import { Container } from './container';
import { StartedTestContainer } from 'testcontainers';
import { EnvConfig } from '../../../src/shared/env-config';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as DbMigrate from 'db-migrate';

export class PostgresContainer implements Container {
  private container: StartedPostgreSqlContainer;
  private readonly IMAGE = 'postgres:16.3';

  async setupContainer(): Promise<StartedTestContainer> {
    const envConfig = EnvConfig.validateWithLoad();
    const container = await new PostgreSqlContainer(this.IMAGE)
      .withDatabase(envConfig.DB_NAME as string)
      .withUsername(envConfig.DB_USERNAME as string)
      .withPassword(envConfig.DB_PASSWORD as string)
      .start();
    this.container = container;
    this.setupEnv();
    await this.applyMigrations(envConfig);
    return container;
  }

  setupEnv(): void {
    process.env.DB_HOST = this.container.getHost();
    process.env.DB_PORT = this.container.getPort().toString();
  }

  private async applyMigrations(envConfig: EnvConfig): Promise<void> {
    await DbMigrate.getInstance(true, {
      config: {
        dev: {
          driver: 'pg',
          user: envConfig.DB_USERNAME,
          password: envConfig.DB_PASSWORD,
          host: process.env.DB_HOST,
          database: envConfig.DB_NAME,
          port: process.env.DB_PORT,
          schema: 'public',
        },
      },
    }).up();
  }
}
