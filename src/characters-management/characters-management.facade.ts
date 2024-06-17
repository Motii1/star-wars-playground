import { Inject, Injectable } from '@nestjs/common';
import { UUID } from '../shared/uuid';
import {
  Character,
  CharacterEditableData,
  CharacterInitialInfo,
} from './entities/character';
import { ModelList, Pagination } from '../shared/pagination';
import { CharactersRepository } from './repositories/characters-repository';

@Injectable()
export class CharactersManagementFacade {
  constructor(
    @Inject(CharactersRepository)
    private readonly charactersRepository: CharactersRepository,
  ) {}

  getAllCharacters(pagination: Pagination): Promise<ModelList<Character>> {
    return this.charactersRepository.find(pagination);
  }

  getSingleCharacter(id: UUID): Promise<Character> {
    return this.charactersRepository.findByIdOrThrow(id);
  }

  deleteCharacter(id: UUID): Promise<void> {
    return this.charactersRepository.deleteById(id);
  }

  async createCharacter(input: CharacterInitialInfo): Promise<Character> {
    const newCharacter = Character.ofInitialInfo(input);
    await this.charactersRepository.save(newCharacter);
    return newCharacter;
  }

  async updateCharacter(
    id: UUID,
    input: CharacterEditableData,
  ): Promise<Character> {
    const character = await this.charactersRepository.findByIdOrThrow(id);
    character.update(input);
    await this.charactersRepository.save(character);
    return character;
  }
}
