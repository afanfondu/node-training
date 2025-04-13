import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsDate,
  ArrayMinSize,
  ValidateIf,
  IsIn,
  IsObject,
  IsOptional,
} from 'class-validator';
import { IsValidHourlyRate } from '../decorators/validators/is-valid-hourly-rate.decorator';
import { IsValidMetadata } from '../decorators/validators/is-valid-metadata.decorator';
import { IsFutureDate } from '../decorators/validators/is-future-date.decorator';

class FullTimeDetailsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  benefits: string[];

  @IsFutureDate()
  @Type(() => Date)
  joiningDate: Date;
}

class ContractorDetailsDto {
  @IsDate()
  @Type(() => Date)
  contractStart: Date;

  @IsDate()
  @Type(() => Date)
  contractEnd: Date;

  @IsValidHourlyRate()
  hourlyRate: number;

  @IsOptional()
  countryCode: string;
}

export class CreateEmploymentDto {
  @IsIn(['full-time', 'contractor'])
  employmentType: 'full-time' | 'contractor';

  @ValidateIf((o) => o.employmentType === 'full-time')
  @IsObject()
  @ValidateNested()
  @Type(() => FullTimeDetailsDto)
  fullTimeDetails?: FullTimeDetailsDto;

  @ValidateIf((o) => o.employmentType === 'contractor')
  @IsObject()
  @ValidateNested()
  @Type(() => ContractorDetailsDto)
  contractorDetails?: ContractorDetailsDto;

  @IsValidMetadata()
  metadata: Record<string, string>;
}
