import { ReactNode } from 'react';

import { Divider, Typography } from '@mui/material';

type Props = {
  children?: ReactNode;
};

const FormGroupDivider = ({ children }: Props) => {
  return (
    <Divider textAlign="left" sx={{ mb: 2 }}>
      <Typography variant="h5" sx={{ fontSize: 18, fontWeight: 600 }}>
        {children}
      </Typography>
    </Divider>
  );
};

export default FormGroupDivider;
