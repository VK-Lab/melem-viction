import { useState } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Checkbox,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import FormGroupDivider from '@/components/FormGroupDivider';

const GridBreak = styled(Box)`
  width: 100%;
`;
const CampaignType = () => {
  const [campaignTypeState, setCampaignType] = useState('1');
  const handleChange = (event: SelectChangeEvent) => {
    setCampaignType(event.target.value as string);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-label">Campaign Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={campaignTypeState}
              label="Campaign Type"
              onChange={handleChange}
            >
              <MenuItem value={'1'}>Membership Benefits</MenuItem>
              <MenuItem value={'2'}>Membership Loyalty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <GridBreak />
        {campaignTypeState === '1' && (
          <>
            <Grid item xs={12}>
              <FormGroupDivider>Discounts</FormGroupDivider>
              <Box sx={{ p: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="$1000 off for Dinner"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="$500 off for Lunch"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormGroupDivider>Giveaways</FormGroupDivider>
              <Box sx={{ p: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="500 points"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="1000 points"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormGroupDivider>Events</FormGroupDivider>
              <Box sx={{ p: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Soft opening"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Grand-opening"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Autumn Music Festival"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormGroupDivider>Exclusive Access</FormGroupDivider>
              <Box sx={{ p: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="VIP Area"
                  />
                </FormGroup>
              </Box>
            </Grid>
          </>
        )}
        {campaignTypeState === '2' && (
          <>
            <Grid item xs={12}>
              <FormGroupDivider>Membership Level</FormGroupDivider>
              <Box sx={{ p: 2 }}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Silver Member"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Gold Member"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Platinum Member"
                  />
                </FormGroup>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormGroupDivider>Membership Point</FormGroupDivider>
              <Box sx={{ p: 2 }}>
                <FormGroup>
                  <TextField
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    fullWidth
                    label="Points"
                    variant="outlined"
                  />
                </FormGroup>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CampaignType;
