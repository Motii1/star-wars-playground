import { Character } from '../entities/character';
import { UUID } from '../../shared/uuid';
import { ModelList, Pagination } from '../../shared/pagination';

export interface CharactersRepository {
  save(entity: Character): Promise<void>;
  deleteById(id: UUID): Promise<void>;
  findByIdOrThrow(id: UUID): Promise<Character>;
  find(pagination: Pagination): Promise<ModelList<Character>>;
}

export const CharactersRepository = Symbol('CharactersRepository');
