import { Injectable } from '@nestjs/common';
import { CharactersRepository } from '../characters-repository';
import { InjectDbConnection } from '../../../shared/db-connection';
import { Database, DbConnection } from '../../../shared/database';
import { Character } from '../../entities/character';
import { InsertObject } from 'kysely';
import { UUID } from '../../../shared/uuid';
import { ModelList, Pagination } from '../../../shared/pagination';
import { EntityNotFoundException } from '../../../shared/exceptions/entity-not-found.exception';
import { parsePostgresEnumArray } from '../../../shared/database-utils';

@Injectable()
export class PostgresCharactersRepository implements CharactersRepository {
  constructor(@InjectDbConnection() private readonly dbConn: DbConnection) {}

  async save(entity: Character): Promise<void> {
    const insertValues: Omit<InsertObject<Database, 'characters'>, 'id'> = {
      created_at: entity.createdAt,
      name: entity.name,
      planet: entity.planet,
      episodes: entity.episodes,
    };
    await this.dbConn
      .insertInto('characters')
      .values({ id: entity.id.toString(), ...insertValues })
      .onConflict((oc) => oc.column('id').doUpdateSet(insertValues))
      .execute();
  }

  async deleteById(id: UUID): Promise<void> {
    await this.dbConn
      .deleteFrom('characters')
      .where('characters.id', '=', id.toString())
      .execute();
  }

  async findByIdOrThrow(id: UUID): Promise<Character> {
    const raw = await this.dbConn
      .selectFrom('characters')
      .selectAll()
      .where('id', '=', id.toString())
      .executeTakeFirst();
    if (!raw) {
      throw new EntityNotFoundException(Character.name, id);
    }
    return this.rawToDomain(raw);
  }

  async find(pagination: Pagination): Promise<ModelList<Character>> {
    const query = this.dbConn
      .selectFrom('characters')
      .selectAll()
      .limit(pagination.perPage)
      .offset(pagination.offset)
      .orderBy('created_at', 'desc');
    const [result, total] = await Promise.all([
      query.execute(),
      this.countAll(),
    ]);
    return pagination.getModelList(result.map(this.rawToDomain), total);
  }

  async countAll(): Promise<number> {
    const result = await this.dbConn
      .selectFrom('characters')
      .select((eb) => eb.fn.countAll().as('count'))
      .executeTakeFirstOrThrow();
    return Number(result.count);
  }

  private rawToDomain(raw: Database['characters']): Character {
    return Character.ofRawData({
      id: UUID.createFromExisting(raw.id),
      planet: raw.planet,
      // @TODO: kysely has problem with parsing postgres arrays of enums
      episodes: parsePostgresEnumArray(raw.episodes as unknown as string),
      createdAt: raw.created_at,
      name: raw.name,
    });
  }
}
