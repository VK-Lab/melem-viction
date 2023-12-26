import { useState } from 'react';

import { Box, Modal, Typography, Link, CircularProgress } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { useAccount, useWaitForTransaction } from 'wagmi';

import { StyledButton, StyledModalBox, StyledWelcomeBlock } from './styled';
import ConnectorButtonMenu from '../@core/ConnectionButton';
import { MiddleTruncatedText } from '@/components/MiddleTruncatedText';
import { Paths } from '@/enums/paths.enum';
import { useMutateCreatePublicNft } from '@/hooks/mutations/useMutateCreatePublicNft';
import { NftCollection } from '@/types/nft-collection';
import imageWelcome from '~/public/img/background.jpeg';

type Props = {
  nftCollection: NftCollection;
};

export const MintCard = ({ nftCollection }: Props) => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isLoading, data } = useMutateCreatePublicNft(
    {
      contractAddress: nftCollection?.tokenAddress as `0x${string}`,
    },
    {
      onSuccess: () => {
        setIsModalOpen(true);
      },
    }
  );
  const { data: transaction, isLoading: isLoadingTransaction } =
    useWaitForTransaction({
      hash: data?.deployHash,
      enabled: !!data?.deployHash,
    });

  const handleOnMint = () => {
    mutate({
      walletAddress: address,
      name: nftCollection.name,
      description: nftCollection.description,
      tokenAddress: nftCollection.tokenAddress,
      imageUrl: nftCollection.defaultImageUrl || '',
      tokenId: '',
      benefits: [],
    });
  };

  const handleOnViewNFTs = () => {
    router.push(Paths.USER_COLLECTION);
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
            <>
              <StyledButton
                variant="contained"
                onClick={handleOnMint}
                loading={isLoading}
              >
                Mint Now
              </StyledButton>
              <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <StyledModalBox sx={{ width: 600 }}>
                  <Typography variant="h5" component="h2" textAlign={'center'}>
                    Waiting for transaction confirmation
                  </Typography>
                  <Box mt={2}>
                    <Typography sx={{ fontSize: 16 }} textAlign={'center'}>
                      Please wait until the transaction is success. You will be
                      redirected to the NFT page.
                    </Typography>
                    <Box
                      mt="2rem"
                      p={2}
                      bgcolor={'#20163c'}
                      borderRadius={'16px'}
                    >
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography sx={{ fontSize: 16 }}>
                          Transaction Hash
                        </Typography>
                        <Link target="_blank" href="/">
                          <MiddleTruncatedText text={data?.deployHash || ''} />
                        </Link>
                      </Box>
                      <Box
                        mt="1rem"
                        display={'flex'}
                        justifyContent={'space-between'}
                      >
                        <Typography sx={{ fontSize: 16 }}>
                          Transaction Status
                        </Typography>
                        <Box display={'flex'} alignItems={'center'} gap="8px">
                          <Typography
                            sx={{
                              fontSize: 16,
                              color:
                                transaction?.status === 'success'
                                  ? green['500']
                                  : transaction?.status === 'reverted'
                                  ? red['500']
                                  : yellow['500'],
                            }}
                          >
                            {transaction?.status}
                          </Typography>
                          {isLoadingTransaction && (
                            <CircularProgress size={16} />
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <Box mt="1rem" display={'flex'} justifyContent={'center'}>
                      <StyledButton
                        variant="contained"
                        onClick={handleOnViewNFTs}
                        loading={isLoadingTransaction}
                      >
                        View Your NFTs
                      </StyledButton>
                    </Box>
                  </Box>
                </StyledModalBox>
              </Modal>
            </>
          ) : (
            <ConnectorButtonMenu isRedirect={false} />
          )}
        </Box>
      </Box>
    </StyledWelcomeBlock>
  );
};
