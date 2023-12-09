import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Box,
  TextField,
  MenuItem,
  Avatar,
  Button,
  Typography,
  InputAdornment,
} from '@mui/material';

import FormGroupDivider from '@/components/FormGroupDivider';

const NFTCollection = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormGroupDivider>Contract Metadata</FormGroupDivider>
          <Grid container spacing={2} xs={12}>
            <Grid item xs={12} sm={3}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  alt="Remy Sharp"
                  src="https://eggforce.io/static/media/dragon-lua%201.9322a419c07dfe761ebc.png"
                  sx={{ width: 160, height: 160 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Grid item container xs={12} sx={{ mb: 2 }} spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    required
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Symbol" variant="outlined" />
                </Grid>
              </Grid>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormGroupDivider>Payout Settings</FormGroupDivider>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: 14 }}>
              Primary Sales
            </Typography>
            <TextField
              required
              fullWidth
              label="Recipient Address"
              variant="outlined"
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: 14 }}>
              Royalties
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                label="Recipient Address"
                variant="outlined"
              />
            </Box>
            <Box sx={{ maxWidth: 300, mt: 3, mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Percentage"
                variant="outlined"
                inputProps={{
                  min: 0,
                  max: 100,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormGroupDivider>Advanced Configuration</FormGroupDivider>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-network-chain-label">
                    Network/Chain
                  </InputLabel>
                  <Select
                    labelId="demo-network-chain-label"
                    id="demo-network-chain"
                    value={10}
                    label="Network/Chain"
                  >
                    <MenuItem value={10}>MetaMask</MenuItem>
                    <MenuItem value={20}>TrustWallet</MenuItem>
                    <MenuItem value={30}>Coin98</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ height: '100%' }}
                >
                  Connect Wallet
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NFTCollection;
