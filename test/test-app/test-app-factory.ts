import { TestApp } from './test-app';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { SharedModule } from '../../src/shared/shared.module';
import { ValidationPipe } from '@nestjs/common';
import { TestLogger } from './test-logger';

export class TestAppFactory {
  static async create(): Promise<TestApp> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SharedModule],
    }).compile();
    const app = moduleFixture.createNestApplication();

    app.useLogger(new TestLogger());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        stopAtFirstError: true,
      }),
    );
    await app.init();
    return new TestApp(app);
  }
}
