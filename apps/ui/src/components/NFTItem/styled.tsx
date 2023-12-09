import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

export const StyledNFTItem = styled(Box)`
  position: relative;
  z-index: 1;
  transition: 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-property: transform, box-shadow;
  box-shadow: ${(p) => {
    return _.get(p.theme, 'customShadows[1]');
  }};
  /* box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px, */
  /* rgb(145 158 171 / 12%) 0px 12px 24px -4px; */
  border-radius: 12px;
  height: 100%;
  padding-bottom: ${(p) => p.theme.spacing(2)};

  &:hover {
    box-shadow: rgb(24 26 32 / 10%) 0px 0px 1px, rgb(71 77 87 / 8%) 0px 7px 14px,
      rgb(24 26 32 / 8%) 0px 3px 6px;
    transform: translateY(-3px);
  }

  .nft-grid {
    &--image {
      height: 320px;
      border-radius: 12px;
      position: relative;

      img {
        border-radius: 12px 12px 0 0;
        object-position: center center;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &--body {
      padding: ${(p) => {
        return `
          ${p.theme.spacing(1)}
          ${p.theme.spacing(1)}
          ${p.theme.spacing(2)}
          ${p.theme.spacing(1)}
        `;
      }};
      margin-bottom: ${(p) => p.theme.spacing(1)};
    }

    &--contractType {
      font-weight: 700;
      font-size: ${(p) => p.theme.typography.pxToRem(12)};
      background-color: #f0f5fb;
      color: ${(p) => p.theme.palette.primary.dark};
      position: absolute;
      z-index: 10;
      left: ${(p) => p.theme.spacing(1)};
      bottom: ${(p) => p.theme.spacing(1)};
    }
  }
`;
