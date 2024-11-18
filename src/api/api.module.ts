import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [PrismaModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
