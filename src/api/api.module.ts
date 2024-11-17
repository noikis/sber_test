import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';

@Module({
  imports: [PrismaModule],
  controllers: [ApiController, SseController],
  providers: [ApiService, SseService],
})
export class ApiModule {}
