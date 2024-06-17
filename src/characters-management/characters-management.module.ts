import { Module } from '@nestjs/common';
import { CharactersManagementFacade } from './characters-management.facade';
import { CharactersRepository } from './repositories/characters-repository';
import { PostgresCharactersRepository } from './repositories/infra/postgres-characters-repository';

@Module({
  providers: [
    CharactersManagementFacade,
    { provide: CharactersRepository, useClass: PostgresCharactersRepository },
  ],
  exports: [CharactersManagementFacade],
})
export class CharactersManagementModule {}
