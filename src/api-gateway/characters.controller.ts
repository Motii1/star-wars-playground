import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CharactersManagementFacade } from '../characters-management/characters-management.facade';
import {
  PaginatedRequestDto,
  PaginatedResponseDto,
} from './dtos/pagination.dto';
import { CharacterDto } from './dtos/character.dto';
import { ResourceId } from './dtos/resource-id.dto';
import { CharacterInputDto } from './dtos/character-input.dto';
import { CharacterEditDto } from './dtos/character-edit.dto';
import { ApiPaginatedResponse } from './decorators/api-paginated-response';
import { Pagination } from '../shared/pagination';
import { UUID } from '../shared/uuid';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersManagementFacade: CharactersManagementFacade,
  ) {}

  @Get()
  @ApiPaginatedResponse(CharacterDto)
  @ApiOperation({
    summary:
      'Retrieve paginated characters in descending order by date when they were added',
  })
  async getAllCharacters(
    @Query() query: PaginatedRequestDto,
  ): Promise<PaginatedResponseDto<CharacterDto>> {
    const paginatedCharacters =
      await this.charactersManagementFacade.getAllCharacters(
        new Pagination(query),
      );
    return PaginatedResponseDto.fromModel(
      paginatedCharacters,
      CharacterDto.from,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve single character by their id',
  })
  async getSingleCharacter(@Param() { id }: ResourceId): Promise<CharacterDto> {
    const result = await this.charactersManagementFacade.getSingleCharacter(
      UUID.createFromExisting(id),
    );
    return CharacterDto.from(result);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete single character by their id',
  })
  async deleteCharacter(@Param() { id }: ResourceId): Promise<void> {
    await this.charactersManagementFacade.deleteCharacter(
      UUID.createFromExisting(id),
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new character',
  })
  async createCharacter(@Body() dto: CharacterInputDto): Promise<CharacterDto> {
    const result = await this.charactersManagementFacade.createCharacter({
      ...dto,
      planet: dto.planet ?? null,
    });
    return CharacterDto.from(result);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Partial update of the existing character',
  })
  async updateCharacter(
    @Param() { id }: ResourceId,
    @Body() dto: CharacterEditDto,
  ): Promise<CharacterDto> {
    const result = await this.charactersManagementFacade.updateCharacter(
      UUID.createFromExisting(id),
      dto,
    );
    return CharacterDto.from(result);
  }
}
