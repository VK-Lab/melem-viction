import { Box, BoxProps, CircularProgress } from '@mui/material';

function Loading(props: BoxProps) {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      mt={'40px'}
      {...props}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
