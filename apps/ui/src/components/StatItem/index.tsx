import { Box, Tooltip, Typography } from '@mui/material';
import { ellipsis } from 'polished';

interface IProps {
  title: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}

const StatItem = (props: IProps) => {
  const { title, value, icon } = props;

  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexFlow: 'column' }}>
      <Box style={{ fontSize: 16, color: '#99abb4' }}>{icon}</Box>
      <Box style={{ height: 24 }}>
        <Tooltip title={value}>
          <Typography
            style={{
              lineHeight: '24px',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000',
              ...ellipsis('140px'),
            }}
            noWrap
            variant="caption"
          >
            {value}
          </Typography>
        </Tooltip>
      </Box>
      <Typography style={{ color: '#99abb4' }} variant="caption">
        {title}
      </Typography>
    </Box>
  );
};

export default StatItem;
