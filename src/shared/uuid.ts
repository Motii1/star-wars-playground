import { InvalidArgumentException } from './exceptions/invalid-argument.exception';
import { isUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class UUID {
  private constructor(private readonly id: string) {
    if (!UUID.isValidId(id)) {
      throw new InvalidArgumentException(
        `Provided id is not valid UUID: ${id}`,
      );
    }
  }

  static createFromExisting(id: string): UUID {
    return new UUID(id);
  }

  static createNew(): UUID {
    const id = randomUUID();
    return new UUID(id);
  }

  static isValidId(id: string) {
    return isUUID(id, 4);
  }

  toString(): string {
    return this.id;
  }

  equals(otherId: UUID | string): boolean {
    return this.id.toString() === otherId.toString();
  }
}
