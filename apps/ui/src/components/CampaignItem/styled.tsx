import { Box, List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCampaignItemRoot = styled(Box)`
  transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-property: transform, box-shadow;
  display: flex;
  flex-flow: row nowrap;
  border-radius: 6px;
  padding: 16px;
  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  text-decoration: none;

  &:hover {
    box-shadow: rgb(24 26 32 / 10%) 0px 0px 1px, rgb(71 77 87 / 8%) 0px 7px 14px,
      rgb(24 26 32 / 8%) 0px 3px 6px;
    transform: translateY(-3px);
  }

  .thumbnail {
    margin-right: 16px;
  }

  .body {
    flex: 1 1 auto;
  }
`;

const StyledCampaignFeatureList = styled(List)`
  display: flex;
  flex-flow: wrap;

  .item {
    flex: 0 0 auto;
    width: 50%;
  }
`;

const StyledViewMoreButton = styled(Typography)`
  margin: 0;
  text-decoration: underline;
  color: #8e8e8e;
`;

export {
  StyledViewMoreButton,
  StyledCampaignFeatureList,
  StyledCampaignItemRoot,
};
