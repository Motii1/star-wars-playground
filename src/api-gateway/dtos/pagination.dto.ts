import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsOptional, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ModelList } from '../../shared/pagination';

export class PaginatedRequestDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ default: 1 })
  page: number = 1;

  @IsPositive()
  @IsOptional()
  @Max(200)
  @Type(() => Number)
  @ApiPropertyOptional({ default: 200 })
  perPage: number = 200;
}

export class PaginatedResponseDto<ItemDto> {
  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  hasMore: boolean;

  @ApiHideProperty()
  items: ItemDto[];

  static fromModel<Model, Dto = Model>(
    data: ModelList<Model>,
    mapper: (m: Model) => Dto,
  ): PaginatedResponseDto<Dto> {
    return {
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      hasMore: data.hasMore,
      items: data.items.map(mapper),
    };
  }
}
