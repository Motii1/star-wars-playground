import { TestApp } from './test-app/test-app';
import { TestAppFactory } from './test-app/test-app-factory';
import { UUID } from '../src/shared/uuid';
import { StarWarsEpisodes } from '../src/shared/star-wars-episodes';
import { expect } from 'vitest';
import { CharacterInputDto } from '../src/api-gateway/dtos/character-input.dto';

const sampleCreateDto: CharacterInputDto = {
  name: 'Sample',
  episodes: [StarWarsEpisodes.ATTACK_OF_THE_CLONES, StarWarsEpisodes.NEW_HOPE],
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
    expect(response.body).toEqual({
      totalPages: 1,
      totalItems: 0,
      hasMore: false,
      items: [],
    });
  });

  it('should create a character and read it', async () => {
    const createResponse = await app.createCharacter(sampleCreateDto);
    expect(createResponse.status).toEqual(201);
    expect(createResponse.body).toEqual(
      expect.objectContaining(sampleCreateDto),
    );

    const readResponse = await app.getSingleCharacter(createResponse.body.id);
    expect(readResponse.status).toEqual(200);
    expect(readResponse.body).toEqual(createResponse.body);

    const paginatedReadResponse = await app.getPaginatedCharacters();
    expect(paginatedReadResponse.status).toEqual(200);
    expect(paginatedReadResponse.body).toEqual({
      totalPages: 1,
      totalItems: 1,
      hasMore: false,
      items: [readResponse.body],
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

    const deleteResponse = await app.deleteCharacter(createResponse.body.id);
    const readAfterDeletionResponse = await app.getSingleCharacter(
      createResponse.body.id,
    );
    expect(deleteResponse.status).toEqual(200);
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
    const editResponse = await app.editCharacter(createResponse.body.id, {
      name: newName,
    });
    const readEditedResponse = await app.getSingleCharacter(
      createResponse.body.id,
    );
    expect(editResponse.status).toEqual(200);
    expect(readEditedResponse.status).toEqual(200);
    expect(editResponse.body).toEqual({
      ...createResponse.body,
      name: newName,
    });
    expect(readEditedResponse.body).toEqual(editResponse.body);
  });
});
