import { createTheme, ThemeOptions } from '@mui/material/styles';

import breakpoints from '@/theme/base/breakpoints';
// import globals from './base/globals';
// import colors from '@/theme/base/colors';
// import typography from '@/theme/base/typography';

// https://stackoverflow.com/questions/72077974/what-is-the-purpose-of-the-fontsize-theme-setting-when-all-typography-variants-a

export interface ICustomTheme extends ThemeOptions {
  customShadows: string[];
}
const theme = createTheme();

export default createTheme({
  breakpoints: { ...breakpoints },
  typography: {
    fontFamily: ['Space Grotesk', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#7040F2',
      dark: '#160e2c',
      light: '#6A5E89',
    },
    action: {
      disabledBackground: '#8e99f3',
    },
  },
  customShadows: [
    '9px 11px 29px 0px rgb(125 138 152 / 15%)',
    '9px 11px 29px 0 rgb(125 138 152 / 15%)',
    '7px 8px 18px 0px rgb(0 0 0 / 10%)',
  ],
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          [theme.breakpoints.up('xl')]: {
            maxWidth: 1440,
          },
        },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: 'white',
            color: '#31274B',
            boxShadow: '9px 10px 29px 0px rgb(125 138 152 / 15%)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'green',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          paddingTop: 6,
          paddingBottom: 6,
          '&:hover': {
            backgroundColor: '#f6f6f6',
          },
          '&.Mui-selected': {
            backgroundColor: '#7040F2',
            color: 'white',
            boxShadow: '7px 8px 18px 0px rgb(0 0 0 / 10%)',
            '&:hover': {
              backgroundColor: '#7040F2',
            },
            '& .MuiListItemIcon-root': {
              color: 'white',
            },
          },
        },
      },
    },
  },
} as ICustomTheme);
