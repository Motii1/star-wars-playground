import { TestApp } from './test-app/test-app';
import { TestAppFactory } from './test-app/test-app-factory';
import { UUID } from '../src/shared/uuid';
import { StarWarsEpisodes } from '../src/shared/star-wars-episodes';
import { expect } from 'vitest';
import { CharacterInputDto } from '../src/api-gateway/dtos/character-input.dto';

const sampleCreateDto: CharacterInputDto = {
  name: 'Sample',
  episodes: [StarWarsEpisodes.ATTACK_OF_THE_CLONES],
};

describe('Characters CRUD integration tests', () => {
  let app: TestApp;

  beforeAll(async () => {
    app = await TestAppFactory.create();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should receive empty list when there are no characters in the system', async () => {
    const response = await app.getPaginatedCharacters();
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({
      totalPages: 1,
      totalItems: 0,
      hasMore: false,
      items: [],
    });
  });

  it('should create a character and read it', async () => {
    const createResponse = await app.createCharacter(sampleCreateDto);
    expect(createResponse.status).toEqual(201);
    expect(createResponse.data).toEqual(
      expect.objectContaining(sampleCreateDto),
    );

    const readResponse = await app.getSingleCharacter(createResponse.data.id);
    expect(readResponse.status).toEqual(200);
    expect(readResponse.data).toEqual(createResponse.data);

    const paginatedReadResponse = await app.getPaginatedCharacters();
    expect(paginatedReadResponse.status).toEqual(200);
    expect(paginatedReadResponse).toEqual({
      totalPages: 1,
      totalItems: 1,
      hasMore: false,
      items: [readResponse.data],
    });
  });

  it('should throw when trying to read not existing character', async () => {
    const response = await app.getSingleCharacter(UUID.createNew().toString());
    expect(response.status).toEqual(404);
  });

  it('should throw when trying to edit not existing character', async () => {
    const response = await app.editCharacter(
      UUID.createNew().toString(),
      sampleCreateDto,
    );
    expect(response.status).toEqual(404);
  });

  it('should delete a character', async () => {
    const createResponse = await app.createCharacter(sampleCreateDto);
    expect(createResponse.status).toEqual(201);

    const deleteResponse = await app.deleteCharacter(createResponse.data.id);
    const readAfterDeletionResponse = await app.getSingleCharacter(
      createResponse.data.id,
    );
    expect(deleteResponse.status).toEqual(201);
    expect(readAfterDeletionResponse.status).toEqual(404);
  });

  it('should return success when trying to delete not existing character', async () => {
    const response = await app.deleteCharacter(UUID.createNew().toString());
    expect(response.status).toEqual(200);
  });

  it('should correctly apply partial update to a character', async () => {
    const createResponse = await app.createCharacter(sampleCreateDto);
    expect(createResponse.status).toEqual(201);

    const newName = 'Some other name';
    const editResponse = await app.editCharacter(createResponse.data.id, {
      name: newName,
    });
    expect(editResponse.status).toEqual(200);
    expect(editResponse.data).toEqual({
      ...createResponse.data,
      name: newName,
    });
  });
});
