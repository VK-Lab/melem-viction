import { Box, Typography } from '@mui/material';
import Image from 'next/future/image';
import { useAccount } from 'wagmi';

import { StyledButton, StyledWelcomeBlock } from './styled';
import ConnectorButtonMenu from '../@core/ConnectionButton';
import { useMutateCreatePublicNft } from '@/hooks/mutations/useMutateCreatePublicNft';
import { NftCollection } from '@/types/nft-collection';
import imageWelcome from '~/public/img/background.jpeg';

type Props = {
  nftCollection: NftCollection;
};

export const MintCard = ({ nftCollection }: Props) => {
  const { address, isConnected } = useAccount();
  const { mutate, isLoading } = useMutateCreatePublicNft({
    contractAddress: nftCollection?.tokenAddress as `0x${string}`,
  });

  const handleOnMint = () => {
    mutate({
      walletAddress: address,
      name: nftCollection.name,
      description: nftCollection.description,
      tokenAddress: nftCollection.tokenAddress,
      imageUrl: '',
      tokenId: '',
      benefits: [],
    });
  };

  return (
    <StyledWelcomeBlock elevation={24}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography sx={{ fontSize: 32 }} variant="h2" gutterBottom>
          {nftCollection.name}
        </Typography>
        <Box mt="1rem">
          <Image
            alt="NFT Image"
            src={nftCollection.defaultImageUrl || imageWelcome}
            height={400}
            width={400}
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box mt="1rem">
          {isConnected ? (
            <StyledButton
              variant="contained"
              onClick={handleOnMint}
              loading={isLoading}
            >
              Mint Now
            </StyledButton>
          ) : (
            <ConnectorButtonMenu />
          )}
        </Box>
      </Box>
    </StyledWelcomeBlock>
  );
};
