import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty({
    title: 'The id of the user',
    description: 'uuid',
    required: true,
    nullable: false,
    example: '281ecef8-aab4-4aa0-a3b7-38b267715130',
    not: {
      examples: ['', '123', '@ivan'],
    },
  })
  id: string;

  @ApiProperty({
    example: 'Илиас',
    description: 'The first name of the user',
    minLength: 3,
    maxLength: 50,
    required: true,
    nullable: false,
    pattern: '/[a-zA-Zа-яА-Я]+$/',
    not: {
      examples: ['', '123', '@ivan'],
    },
  })
  firstName: string;

  @ApiProperty({
    example: 'Эззахид',
    description: 'The last name of the user',
    minLength: 3,
    maxLength: 50,
    required: false,
    nullable: true,
    pattern: '/[a-zA-Zа-яА-Я]+$/',
    not: {
      examples: ['', '123', '@ivan'],
    },
  })
  lastName: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    title: 'The date of the user creation',
    description: 'ISO String',
    required: true,
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'ISO String',
    title: 'The date of the user update',
    required: false,
    nullable: true,
  })
  updatedAt: Date;
}
