import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from 'src/types';
import { PrismaUserRepository } from './prisma-user.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: 'PrismaClient',
      useFactory: () => {
        const client = new PrismaClient();
        client.$connect();
        return client;
      },
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class PrismaModule {}
