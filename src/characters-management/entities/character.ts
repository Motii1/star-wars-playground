import { UUID } from '../../shared/uuid';
import { StarWarsEpisodes } from '../../shared/star-wars-episodes';
import { stripUndefinedProperties } from '../../shared/object-utils';

type CharacterData = {
  id: UUID;
  name: string;
  episodes: StarWarsEpisodes[];
  planet: string | null;
  createdAt: Date;
};

export type CharacterInitialInfo = Pick<
  CharacterData,
  'name' | 'episodes' | 'planet'
>;

export type CharacterEditableData = Partial<
  Pick<CharacterData, 'name' | 'episodes' | 'planet'>
>;

export class Character {
  private constructor(private props: CharacterData) {}

  static ofRawData(data: CharacterData): Character {
    return new Character(data);
  }

  static ofInitialInfo(data: CharacterInitialInfo): Character {
    return new Character({
      id: UUID.createNew(),
      name: data.name,
      planet: data.planet ?? null,
      episodes: data.episodes,
      createdAt: new Date(),
    });
  }

  update(data: CharacterEditableData): void {
    stripUndefinedProperties(data);
    this.props = { ...this.props, ...data };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get episodes() {
    return this.props.episodes;
  }

  get planet() {
    return this.props.planet;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
