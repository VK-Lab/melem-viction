import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  TextField,
  MenuItem,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const GridBreak = styled(Box)`
  width: 100%;
`;
const CampaignInfo = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Avatar
              alt="Remy Sharp"
              src="https://eggforce.io/static/media/dragon-lua%201.9322a419c07dfe761ebc.png"
              sx={{ width: 160, height: 160 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Campaign Detail
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="Brand"
            >
              <MenuItem value={10}>Sochy</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <GridBreak />
        <Grid item xs={12}>
          <TextField fullWidth label="Campaign Name" variant="outlined" />
        </Grid>
        <GridBreak />
        <Grid item xs={12}>
          <TextField
            multiline
            maxRows={5}
            fullWidth
            label="Description"
            variant="outlined"
          />
        </Grid>
        <GridBreak />
        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            maxRows={14}
            fullWidth
            label="Content"
            variant="outlined"
          />
        </Grid>
        <GridBreak />
      </Grid>
    </Box>
  );
};

export default CampaignInfo;
