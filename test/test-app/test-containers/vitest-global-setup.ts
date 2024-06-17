import { TestContainersManager } from './test-containers-manager';

export async function setup() {
  await TestContainersManager.setupExternalContainers();
}
