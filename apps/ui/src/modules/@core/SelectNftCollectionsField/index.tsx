import { AutocompleteElement } from 'react-hook-form-mui';

import { ContractNameEnum } from '@/enums/contractName.enum';
import { useGetAllNftCollections } from '@/hooks/queries';
import { NftCollection } from '@/types/nft-collection';

type Props = {
  name: string;
  campaignId?: string;
};

const SelectNftCollectionsField = ({ name, campaignId }: Props) => {
  const {
    data: { items: nftCollections = [] } = { items: [], total: 0 },
    isLoading,
  } = useGetAllNftCollections();

  return (
    <AutocompleteElement
      loading={isLoading}
      matchId
      label="Public NFT Collection"
      name={name}
      options={nftCollections
        .filter(
          (nftCollection: NftCollection) =>
            !nftCollection.campaignId || nftCollection.campaignId === campaignId
        )
        .filter(
          (collection) => collection.contractName !== ContractNameEnum.INSTALLER
        )
        .map((item: NftCollection) => {
          return {
            id: item.id,
            label: item.name,
          };
        })}
      rules={{
        required: 'Please fill out.',
      }}
    />
  );
};

export default SelectNftCollectionsField;
