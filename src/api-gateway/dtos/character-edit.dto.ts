import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { StarWarsEpisodes } from '../../shared/star-wars-episodes';

export class CharacterEditDto {
  @ValidateIf((v) => v.name !== undefined)
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @ValidateIf((v) => v.episodes !== undefined)
  @IsArray()
  @IsEnum(StarWarsEpisodes, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ArrayUnique()
  episodes?: StarWarsEpisodes[];

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  planet?: string | null;
}
