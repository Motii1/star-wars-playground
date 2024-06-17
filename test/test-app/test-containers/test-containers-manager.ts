import { Container } from './container';
import { PostgresContainer } from './postgres-container';

export class TestContainersManager {
  private static containers: Container[] = [];

  /* Setup environment variables to point to proper test containers */
  static setupEnv(): void {
    this.containers.map((c) => c.setupEnv());
  }

  static async setupExternalContainers(): Promise<void> {
    const databaseContainer = new PostgresContainer();
    this.containers = [databaseContainer];
    await Promise.all(
      this.containers.map((container) => container.setupContainer()),
    );
    this.setupEnv();
  }
}
