import { Grid, Box, Typography } from '@mui/material';

const CampaignSummary = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography sx={{ mb: 2 }} variant="h5">
            Campaign name
          </Typography>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            tenetur, corporis ut suscipit odio accusantium?
          </p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignSummary;
