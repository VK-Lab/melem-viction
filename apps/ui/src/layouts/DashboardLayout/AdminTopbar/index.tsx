import { ReactNode, useState, MouseEvent } from 'react';

import {
  Toolbar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { StyledAppbar } from './styled';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { PublicPaths } from '@/enums/paths.enum';
import { logout } from '@/services/auth';

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
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const logoutMutation = useMutation({
    mutationFn: logout,
    mutationKey: 'logout',
    onSuccess: () => {
      Cookies.remove(CookieKeys.TOKEN);
      router.push(PublicPaths.HOME);
    },
  });

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
              <Avatar
                alt="Remy Sharp"
                src="https://i.pinimg.com/564x/a2/da/a9/a2daa9fad83e9cbad30e6ec0d1921104.jpg"
              />
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
