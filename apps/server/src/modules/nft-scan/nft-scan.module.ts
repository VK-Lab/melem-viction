import { Module } from '@nestjs/common';

import { NftScanService } from './nft-scan.service';

@Module({
  providers: [NftScanService],
  exports: [NftScanService],
})
export class NftScanModule {}
