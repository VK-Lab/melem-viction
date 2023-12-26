import { Box } from '@mui/material';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MintCard } from './MintCard';
import {
  StyledImageOverlay,
  StyledBox,
  StyledWelcomePage,
  BoxGradientBG,
} from './styled';
import { useGetCampaign } from '@/hooks/queries/useGetCampaign';
import imageWelcome from '~/public/img/background.jpeg';
import Logo from '~/public/img/logo.png';

const MintCampaign = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetCampaign(id as string);

  return (
    <StyledWelcomePage disableGutters maxWidth={false}>
      <div
        className="melem--logo"
        style={{ position: 'fixed', left: 24, top: 24, zIndex: 1000 }}
      >
        <Link href={`/`}>
          <Image alt="Melem" src={Logo} style={{ height: 'auto', width: 80 }} />
        </Link>
      </div>
      <StyledBox className="left">
        <StyledImageOverlay />
        <Image
          alt="Mountains"
          src={data?.nftCollections[0].defaultImageUrl || imageWelcome}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 0.1,
          }}
        />
      </StyledBox>
      <StyledBox className="right">
        <BoxGradientBG />
        <Box display={'flex'}>
          {data?.nftCollections?.map((nftCollection) => {
            return (
              <MintCard key={nftCollection.id} nftCollection={nftCollection} />
            );
          })}
        </Box>
      </StyledBox>
    </StyledWelcomePage>
  );
};

export default MintCampaign;
