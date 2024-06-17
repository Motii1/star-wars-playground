import { Injectable } from '@nestjs/common';
import { UUID } from '../shared/uuid';
import {
  Character,
  CharacterEditableData,
  CharacterInitialInfo,
} from './entities/character';
import { ModelList, Pagination } from '../shared/pagination';

@Injectable()
export class CharactersManagementFacade {
  getAllCharacters(pagination: Pagination): Promise<ModelList<Character>> {
    return {} as never;
  }

  getSingleCharacter(id: UUID): Promise<Character> {
    return {} as never;
  }

  deleteCharacter(id: UUID): Promise<void> {
    return {} as never;
  }

  createCharacter(input: CharacterInitialInfo): Promise<Character> {
    return {} as never;
  }

  updateCharacter(id: UUID, input: CharacterEditableData): Promise<Character> {
    return {} as never;
  }
}
