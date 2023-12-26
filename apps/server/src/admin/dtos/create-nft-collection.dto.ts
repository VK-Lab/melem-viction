import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { isArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import { ContractNameEnum } from '@/modules/nft-collection/enums/contract-name.enum';

export class CreateNftCollectionDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public name!: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public description!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public tokenAddress!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public chainId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public contractType!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public defaultImageUrl?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public uid!: string;

  @ApiProperty()
  @IsEnum(ContractNameEnum)
  @IsNotEmpty()
  public contractName!: ContractNameEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }: { value: string[] }) => {
    if (!isArray(value)) {
      return [];
    }

    return value.map((val: string) => new Types.ObjectId(val));
  })
  public benefitIds?: Types.ObjectId[];
}
