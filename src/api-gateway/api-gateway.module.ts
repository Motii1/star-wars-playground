import { Module } from '@nestjs/common';
import { CharactersManagementModule } from '../characters-management/characters-management.module';
import { CharactersController } from './characters.controller';

@Module({
  imports: [CharactersManagementModule],
  controllers: [CharactersController],
})
export class ApiGatewayModule {}
