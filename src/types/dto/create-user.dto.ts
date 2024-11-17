import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
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
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Zа-яА-Я]+$/, {
    message: 'Only letters are allowed',
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
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Zа-яА-Я]+$/, {
    message: 'Only letters are allowed',
  })
  lastName: string;
}
