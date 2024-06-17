import { IsUUID } from 'class-validator';

export class ResourceId {
  @IsUUID(4)
  id: string;
}
