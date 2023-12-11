import { ErcType, EvmChain, NftscanEvm } from 'nftscan-api';
import { Injectable } from '@nestjs/common';

import { NftScanEvmAsset } from './interfaces/nft-scan-asset.interface';

import { ConfigService } from '@/common';

@Injectable()
export class NftScanService {
  private evm: NftscanEvm;

  constructor(
    private readonly config: ConfigService,
  ) {

    this.evm = new NftscanEvm({
      apiKey: this.config.get('nftScan.apiKey'),
      chain: EvmChain.VICTION,
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

  public async getAssetByContractAddressAndTokenId(
    contractAddress: string,
    tokenId: string,
  ): Promise<NftScanEvmAsset> {
    const response = await this.evm.asset.getAssetsByContractAndTokenId(
      contractAddress,
      tokenId,
      true,
    );

    return response;
  }

}
