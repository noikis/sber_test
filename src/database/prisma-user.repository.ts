import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserRepository,
  UserResponseDTO,
} from 'src/types';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    @Inject('PrismaClient')
    private readonly _client: PrismaClient,
  ) {}

  async create(dto: CreateUserDTO): Promise<UserResponseDTO> {
    const user = await this._client.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    return user;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this._client.user.findMany({
      orderBy: { firstName: 'asc' },
    });
    return users;
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user = await this._client.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async updateById(id: string, dto: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this._client.user.update({
      where: {
        id,
      },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });
    return user;
  }

  async deleteById(id: string): Promise<UserResponseDTO> {
    const user = await this._client.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
