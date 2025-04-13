import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsIn,
  IsInt,
  Min,
  Max,
  IsUUID,
  ValidateNested,
  IsArray,
  IsObject,
  ArrayNotEmpty,
} from 'class-validator';
import { IsValidPostalCode } from '../decorators/validators/is-valid-postal-code.decorator';

class AddressDto {
  @IsString()
  @Length(5, 100)
  street: string;

  @IsString()
  @IsValidPostalCode('IN')
  postalCode: string;
}

class EducationDto {
  @IsIn(['BSc', 'MSc', 'PhD'])
  degree: string;

  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  year: number;
}

export class CreatePersonDto {
  @IsUUID()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];
}
