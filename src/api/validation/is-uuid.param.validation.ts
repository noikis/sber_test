import { IsUUID } from 'class-validator';

export class IsUUIDParam {
  @IsUUID()
  id: string;
}
