import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [ApiGatewayModule, SharedModule],
})
export class AppModule {}
