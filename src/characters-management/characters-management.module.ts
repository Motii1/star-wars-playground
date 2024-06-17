import { Module } from '@nestjs/common';
import { CharactersManagementFacade } from './characters-management.facade';

@Module({
  providers: [CharactersManagementFacade],
  exports: [CharactersManagementFacade],
})
export class CharactersManagementModule {}
