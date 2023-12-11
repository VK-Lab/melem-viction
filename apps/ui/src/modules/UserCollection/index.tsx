import { useState, SyntheticEvent } from 'react';

import WalletIcon from '@mui/icons-material/Wallet';
import { Grid, Tabs, Box, Typography, Container } from '@mui/material';
import _get from 'lodash/get';
import { useAccount } from 'wagmi';

import ListNfts from './ListNfts';
import {
  BoxProfileUnderbackground,
  BoxProfileWrapper,
  BoxProfile,
} from './styled';
import Avatar from '@/components/Avatar';
import {
  StyledNFTTabContent,
  StyledNFTTab,
} from '@/components/NFTCollectionGroup/StyledNFTCollectionGroup';
import { Profile } from '@/components/Profile/StyledProfile';
import StatItem from '@/components/StatItem';
import TabPanel from '@/components/TabPanel';
import { useGetMyProfile } from '@/hooks/queries';
import { StyledDashboardSection } from '@/layouts/DashboardLayout/styled';
import RegularLayout from '@/layouts/RegularLayout';
import { ButtonAuthWalletModal } from '@/modules/core/ButtonAuthWalletModal';

export const ProfileInfo = () => {
  const { address } = useAccount();
  const { data: profile } = useGetMyProfile();

  return (
    <Profile className="profile">
      <Box className="profile--image">
        <Avatar name={address || ''} size={150} />
      </Box>
      <Box className="profile--username">
        <Typography className="user-alias" variant="h3">
          {`${_get(profile, 'cnvLoyaltyUser.firstName', 'D2E')} ${_get(
            profile,
            'cnvLoyaltyUser.lastName',
            'User'
          )}`}
        </Typography>
      </Box>
    </Profile>
  );
};

const UserCollection = () => {
  const { address } = useAccount();
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <RegularLayout>
      <BoxProfile
        sx={{
          background: 'white',
          p: 2,
          mb: 2,
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          <BoxProfileWrapper>
            <BoxProfileUnderbackground />
            <Grid container sx={{ position: 'relative', zIndex: 1 }}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={4}
                sx={{
                  display: {
                    lg: 'flex',
                  },
                  alignItems: {
                    lg: 'flex-end',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <StatItem
                    title="Address"
                    value={address}
                    icon={<WalletIcon />}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                lg={4}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ProfileInfo />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                lg={4}
                sx={{
                  pr: 1,
                  display: {
                    lg: 'flex',
                  },
                  alignItems: {
                    lg: 'flex-end',
                  },
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ width: '100%', textAlign: 'right' }}
                >
                  <Box sx={{ ml: 'auto' }}>
                    <Box mr="1rem">
                      <ButtonAuthWalletModal />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </BoxProfileWrapper>
        </Container>
      </BoxProfile>
      <Container maxWidth="xl">
        <StyledDashboardSection>
          <StyledNFTTab>
            <Tabs value={value} onChange={handleChange}>
              {/* <Tab
                sx={{ fontWeight: 600 }}
                icon={<PersonPinIcon />}
                iconPosition="start"
                label="My NFTs"
              /> */}
              {/* <Tab
                sx={{ fontWeight: 600 }}
                icon={<AppsIcon />}
                iconPosition="start"
                label="Collections"
              /> */}
            </Tabs>
          </StyledNFTTab>
          <StyledNFTTabContent>
            <TabPanel value={value} index={0}>
              <ListNfts />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid
                container
                columnSpacing={3}
                rowSpacing={{ xs: 2, sm: 6 }}
              ></Grid>
            </TabPanel>
          </StyledNFTTabContent>
        </StyledDashboardSection>
      </Container>
    </RegularLayout>
  );
};

export default UserCollection;
