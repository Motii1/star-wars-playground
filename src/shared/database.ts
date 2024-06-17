import { Kysely } from 'kysely';
import { StarWarsEpisodes } from './star-wars-episodes';

interface CharactersTable {
  id: string;
  name: string;
  planet: string;
  episodes: StarWarsEpisodes[];
  created_at: Date;
}

export interface Database {
  characters: CharactersTable;
}

export type DbConnection = Kysely<Database>;
