import { INestApplication, Type } from '@nestjs/common';
import { DB_CONNECTION } from '../../src/shared/db-connection';
import request from 'supertest';

export class TestApp {
  constructor(private readonly app: INestApplication) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  getProvider<T>(type: Type<T> | symbol | string | Function): T {
    return this.app.get(type);
  }

  supertestRequest() {
    return request(this.app.getHttpServer());
  }

  async close(): Promise<void> {
    await this.app.get(DB_CONNECTION).destroy();
    await this.app.close();
  }
}
