import { INestApplication } from '@nestjs/common';
import { DB_CONNECTION } from '../../src/shared/db-connection';
import request from 'supertest';
import { PaginatedRequestDto } from '../../src/api-gateway/dtos/pagination.dto';
import { CharacterInputDto } from '../../src/api-gateway/dtos/character-input.dto';
import { CharacterEditDto } from '../../src/api-gateway/dtos/character-edit.dto';

export class TestApp {
  constructor(private readonly app: INestApplication) {}

  supertestRequest() {
    return request(this.app.getHttpServer());
  }

  async close(): Promise<void> {
    await this.app.get(DB_CONNECTION).destroy();
    await this.app.close();
  }

  // @TODO: implement testing SDK instead of packing everything in one class
  getSingleCharacter(id: string) {
    return this.supertestRequest().get(`/characters/${id}`).send();
  }

  getPaginatedCharacters(
    pagination: PaginatedRequestDto = { page: 1, perPage: 200 },
  ) {
    return this.supertestRequest().get(`/characters`).query(pagination).send();
  }

  deleteCharacter(id: string) {
    return this.supertestRequest().delete(`/characters/${id}`).send();
  }

  createCharacter(dto: CharacterInputDto) {
    return this.supertestRequest().post(`/characters`).send(dto);
  }

  editCharacter(id: string, dto: CharacterEditDto) {
    return this.supertestRequest().patch(`/characters/${id}`).send(dto);
  }
}
