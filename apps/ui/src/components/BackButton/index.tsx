import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return (
    <Button size="small" onClick={() => router.back()} variant="outlined">
      Back
    </Button>
  );
};

export default BackButton;
