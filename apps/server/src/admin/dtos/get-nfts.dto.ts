import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

import { PaginationDto } from '@/common';

export class GetNftsDto extends PaginationDto {
  @ApiProperty()
  @IsPositive()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  public override limit: number = 1000;
}
