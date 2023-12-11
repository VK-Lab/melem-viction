import { ErcType, EvmChain, NftscanEvm } from 'nftscan-api';

import { NftScanEvmAsset } from './interfaces/nft-scan-asset.interface';

import { ConfigService, Logger } from '@/common';


export class NftScanService {
  private evm: NftscanEvm;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(NftScanService.name);

    this.evm = new NftscanEvm({
      apiKey: this.config.get('nftScan.apiKey'),
      chain: EvmChain.ETH,
    });
  }

  public async getAssetsByAccount(
    publicKey: string,
  ): Promise<NftScanEvmAsset[]> {
    const response = await this.evm.asset.getAssetsByAccount(publicKey,
      {
        erc_type: ErcType.ERC_721, // Can be erc721 or erc1155
      });

    return response.content;
  }
}
