import { NotFoundException } from '@nestjs/common';
import { UUID } from '../uuid';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string, id?: string | UUID) {
    if (!id) {
      super(`${entityName} could not be found for given parameters`);
    } else {
      super(`${entityName} of id "${id.toString()}" could not be found`);
    }
  }
}
