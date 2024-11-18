import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Sse,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDTO, UserResponseDTO } from 'src/types';
import { CreateUserDTO } from 'src/types/dto/create-user.dto';
import { ApiService } from './api.service';
import { IsUUIDParam } from './validation';

@ApiTags('users')
@Controller('/api')
export class ApiController {
  constructor(private readonly _apiService: ApiService) {}

  @Post('/users/')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserResponseDTO,
  })
  async createCategory(@Body() body: CreateUserDTO): Promise<UserResponseDTO> {
    return this._apiService.createUser(body);
  }

  @Get('/users/:id/')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'UUID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Get User by id.',
    type: UserResponseDTO,
  })
  async findById(@Param() param: IsUUIDParam): Promise<UserResponseDTO> {
    return this._apiService.findById(param.id);
  }

  @Get('/users/')
  @ApiOkResponse({
    description: 'Get  all User.',
    type: [UserResponseDTO],
  })
  async findAll(): Promise<UserResponseDTO[]> {
    return this._apiService.findAll();
  }

  @Patch('/users/:id/')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'UUID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Partial update User by id.',
    type: UserResponseDTO,
  })
  async updateById(
    @Param() param: IsUUIDParam,
    @Body() body: UpdateUserDTO,
  ): Promise<UserResponseDTO> {
    return this._apiService.updateById(param.id, body);
  }

  @Delete('/users/:id/')
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'UUID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Delete User by id.',
    type: UserResponseDTO,
  })
  async deleteById(@Param() param: IsUUIDParam): Promise<UserResponseDTO> {
    return this._apiService.deleteById(param.id);
  }

  @Sse('/sse/users')
  async sendUsers() {
    {
      return this._apiService.sseListener();
    }
  }
}
