import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map } from 'rxjs';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserRepository,
  UserResponseDTO,
} from 'src/types';

@Injectable()
export class ApiService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(body: CreateUserDTO): Promise<UserResponseDTO> {
    return this.userRepository.create(body);
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const result = await this.userRepository.findById(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    return this.userRepository.findAll();
  }

  async updateById(id: string, body: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.userRepository.updateById(id, body);
    return result;
  }

  async deleteById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.userRepository.deleteById(id);
    return result;
  }

  async sseListener() {
    const users = await this.findAll();
    return from(users).pipe(map((user) => JSON.stringify(user)));
  }
}
