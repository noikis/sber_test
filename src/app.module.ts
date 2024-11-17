import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api';
import { PrismaModule } from './database';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ApiModule],
  providers: [],
})
export class AppModule {}
