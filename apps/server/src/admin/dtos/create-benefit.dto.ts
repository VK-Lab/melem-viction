import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

import { BeneiftSourceEnum } from '@/modules/benefit/enums/benefit-source.enum';

export class CreateBenefitDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public description?: string;

  @IsEnum(BeneiftSourceEnum)
  @IsOptional()
  @ApiPropertyOptional()
  public source?: BeneiftSourceEnum;

  @IsPositive()
  @ApiPropertyOptional()
  @IsOptional()
  public amount!: number;
}
