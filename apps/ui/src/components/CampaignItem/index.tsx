import React from 'react';

import {
  Tooltip,
  Box,
  List,
  Avatar,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import sampleSize from 'lodash/sampleSize';

import {
  StyledViewMoreButton,
  StyledCampaignFeatureList,
  StyledCampaignItemRoot,
} from './styled';
import iconMetaMask from '@/assets/images/icon--metamask.svg';

const data = [
  '$1000 off for Dinner',
  '$500 off for Dinner',
  '500 points',
  '1000 points',
  'Soft opening',
  'Grand-opening',
  'Autum Mustic Festival',
  'VIP Area',
  'Silver Member',
  'Gold Member',
  'Platinum Member',
];

const CampaignFeatures = () => (
  <Box>
    <List dense>
      {data.map((value, index) => (
        <ListItem key={`item--${index}`} disableGutters className="item">
          <ListItemText
            sx={{
              m: 0,
            }}
            primaryTypographyProps={{
              variant: 'caption',
            }}
            primary={value}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

const CampaignItem = () => {
  const randomData = sampleSize(data, 5);
  return (
    <StyledCampaignItemRoot>
      <Box className="thumbnail">
        <Avatar
          alt="Remy Sharp"
          src="https://eggforce.io/static/media/dragon-lua%201.9322a419c07dfe761ebc.png"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Box className="body">
        <Typography variant="subtitle2">Sochy</Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Grand Opening
        </Typography>
        <Box>
          <StyledCampaignFeatureList dense>
            {randomData.map((value, index) => (
              <ListItem key={`item--${index}`} disableGutters className="item">
                <ListItemText
                  sx={{
                    m: 0,
                  }}
                  primaryTypographyProps={{
                    variant: 'caption',
                  }}
                  primary={value}
                />
              </ListItem>
            ))}
          </StyledCampaignFeatureList>
          <Tooltip title={<CampaignFeatures />}>
            <StyledViewMoreButton variant="caption">
              View more
            </StyledViewMoreButton>
          </Tooltip>
        </Box>
      </Box>
      <Box className="column-3">
        <Avatar
          variant="square"
          alt="Remy Sharp"
          src={iconMetaMask}
          sx={{ width: 24, height: 24 }}
        />
      </Box>
    </StyledCampaignItemRoot>
  );
};

export default CampaignItem;
