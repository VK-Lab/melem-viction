import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Profile = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .profile {
    &--image {
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
