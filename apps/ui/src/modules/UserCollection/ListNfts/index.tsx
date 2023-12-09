import { Grid } from '@mui/material';

import EmptyData from '@/components/EmptyData';
// import mockResult from './mock';
import WrappedLink from '@/components/Link';
import NFTItem from '@/components/NFTItem';
import { Paths } from '@/enums/paths.enum';
import { useGetNfts } from '@/hooks/queries';
import { Nft } from '@/types/nft';
import { generatePath } from '@/utils/path';

const ListNfts = () => {
  const { data: nfts = [] } = useGetNfts();

  if (!nfts?.length) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <EmptyData />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container columnSpacing={3} rowSpacing={{ xs: 3, sm: 4 }}>
      {nfts.map((nft: Nft, i: number) => (
        <Grid
          key={`nft-grid--${i}`}
          item
          xs={3}
          sm={3}
          sx={{ cursor: 'pointer' }}
          minWidth={'262px'}
        >
          <WrappedLink
            href={{
              pathname: generatePath(Paths.NFT_DETAIL, {
                tokenAddress: nft.tokenAddress,
              }),
              query: {
                tokenId: nft.tokenId,
              },
            }}
            passHref
          >
            <NFTItem
              image={nft.imageUrl}
              name={nft.name}
              contractType={nft.contractType}
              description={nft.description}
            />
          </WrappedLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListNfts;
