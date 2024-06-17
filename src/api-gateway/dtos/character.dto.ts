import { StarWarsEpisodes } from '../../shared/star-wars-episodes';
import { Character } from '../../characters-management/entities/character';

export class CharacterDto {
  id: string;
  name: string;
  episodes: StarWarsEpisodes[];
  planet: string | null;
  createdAt: Date;

  static from(entity: Character): CharacterDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      createdAt: entity.createdAt,
      episodes: entity.episodes,
      planet: entity.planet,
    };
  }
}
