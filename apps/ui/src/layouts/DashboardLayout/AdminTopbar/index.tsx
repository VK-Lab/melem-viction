import { ReactNode, useState, MouseEvent } from 'react';

import {
  Toolbar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAccount } from 'wagmi';

import { StyledAppbar } from './styled';
import Avatar from '@/components/Avatar';
import { useMutateLogout } from '@/hooks/mutations';

const settings = [
  {
    title: 'Logout',
    key: 'logout',
  },
];
export type Props = {
  children?: ReactNode;
  drawerWidth?: number;
};

const Index = ({ children, drawerWidth }: Props) => {
  const { address } = useAccount();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logoutMutation = useMutateLogout();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSetting = (key: string) => {
    switch (key) {
      case 'logout':
        logoutMutation.mutate();
        break;
      default:
    }
  };

  return (
    <StyledAppbar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar name={address || ''} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(({ title, key }) => (
              <MenuItem key={title} onClick={() => handleClickSetting(key)}>
                <Typography sx={{ fontSize: 16 }} textAlign="center">
                  {title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppbar>
  );
};

export default Index;
