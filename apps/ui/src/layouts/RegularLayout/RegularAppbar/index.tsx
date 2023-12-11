import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAccount } from 'wagmi';

import { StyledContainer } from './styled';
import Avatar from '@/components/Avatar';
import GLogo from '@/components/GLogo';
import { CookieKeys } from '@/enums/cookieKeys.enum';
import { PublicPaths } from '@/enums/paths.enum';
import { logout } from '@/services/auth';

const pages: string[] = [];
const settings = [
  {
    title: 'Logout',
    key: 'logout',
  },
];

function RegularAppbar() {
  const router = useRouter();
  const { address } = useAccount();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const logoutMutation = useMutation({
    mutationFn: logout,
    mutationKey: 'logout',
    onSuccess: () => {
      Cookies.remove(CookieKeys.TOKEN);
      router.push(PublicPaths.HOME);
    },
  });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    <AppBar
      position="fixed"
      sx={{
        background: 'white',
        width: `100%`,
      }}
    >
      <StyledContainer maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <GLogo />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ color: 'primary' }} textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              ml: 'auto',
              mr: 'auto',
              flex: '1 1 auto',
            }}
          >
            <GLogo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Button
              sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              endIcon={<LockIcon />}
              variant="contained"
            >
              Disconnect Wallet
            </Button> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1.5 }}>
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
              {settings.map(({ key, title }) => (
                <MenuItem key={key} onClick={() => handleClickSetting(key)}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </StyledContainer>
    </AppBar>
  );
}
export default RegularAppbar;
