import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Profile = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .profile {
    &--image {
      background-color: white;
      flex: 0 0 auto;
      width: 160px;
      box-shadow: ${(p) => p.theme.shadows[12]};
      transition-duration: ${(p) => p.theme.transitions.duration.short}ms;
      border-radius: 50%;
      padding: 6px;

      &:hover {
        box-shadow: ${(p) => p.theme.shadows[16]};
      }

      img {
        max-width: 100%;
        display: block;
        border-radius: 50%;
      }
    }

    &--username {
      color: #5d5d5d;

      .user-alias {
        font-size: 18px;
        line-height: 1;
        margin-top: 20px;
      }

      .user-uid {
        color: #5d5d5d;
      }
    }
  }
`;

export { Profile };
