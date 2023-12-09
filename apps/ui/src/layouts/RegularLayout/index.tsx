import React, { ReactNode } from 'react';

import { Toolbar, Box, Container } from '@mui/material';

import RegularAppbar from '@/layouts/RegularLayout/RegularAppbar';

type Props = {
  children?: ReactNode;
};

const RegularLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <RegularAppbar />
      <Box>
        <Toolbar />
        <Container disableGutters maxWidth={false}>
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default RegularLayout;
