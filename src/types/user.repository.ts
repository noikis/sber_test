import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from './dto';

export abstract class UserRepository {
  abstract create(
    dto: CreateUserDTO,
  ): UserResponseDTO | Promise<UserResponseDTO>;

  abstract findById(id: string): UserResponseDTO | Promise<UserResponseDTO>;

  abstract findAll(): UserResponseDTO[] | Promise<UserResponseDTO[]>;

  abstract updateById(
    id: string,
    dto: UpdateUserDTO,
  ): UserResponseDTO | Promise<UserResponseDTO>;

  abstract deleteById(id: string): UserResponseDTO | Promise<UserResponseDTO>;
}
