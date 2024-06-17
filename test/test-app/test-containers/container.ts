import { StartedTestContainer } from 'testcontainers';

export interface Container {
  setupEnv(): void;
  setupContainer(): Promise<StartedTestContainer>;
}
