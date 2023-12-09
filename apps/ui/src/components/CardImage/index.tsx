import { Box } from '@mui/material';

import LoadingImage from '../LoadingImage';
import { isVideo } from '@/utils/type';

type Props = {
  src?: string;
  autoPlay?: boolean;
  controls?: boolean;
};

export const CardImage = ({
  src,
  autoPlay = true,
  controls = false,
}: Props) => {
  if (!src) {
    return null;
  }

  if (!isVideo(src)) {
    return <LoadingImage src={src} layout="fill" />;
  }

  return (
    <Box position="relative" height={'100%'}>
      <video
        width="100%"
        height="100%"
        autoPlay={autoPlay}
        controls={controls}
        loop
        style={{
          objectFit: 'contain',
          width: '100%',
          height: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </Box>
  );
};
