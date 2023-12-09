import { useState } from 'react';

import {
  Box,
  Button,
  StepLabel,
  Stepper,
  Step,
  Grid,
  Typography,
} from '@mui/material';

import CampaignInfo from './CampaignInfo';
import CampaignSummary from './CampaignSummary';
import CampaignType from './CampaignType';
import NFTCollection from './NFTCollection';
import DashboardLayout from '@/layouts/DashboardLayout';
import { StyledDashboardSection } from '@/layouts/DashboardLayout/styled';

const CampaignCreator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const Topbar = (
    <Typography variant="h6" noWrap component="div">
      Campaign Creator
    </Typography>
  );
  const steps = [
    'Campaign Info',
    'Attach Benefits',
    'NFT Collection',
    'Summary',
  ];
  const handleBack = () => {
    if (activeStep >= 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <DashboardLayout elementTopbar={Topbar}>
      <StyledDashboardSection>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} sx={{ mt: 6 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12} sm={8} sx={{ mt: 6, mb: 6 }}>
            {activeStep === 0 && <CampaignInfo />}
            {activeStep === 1 && <CampaignType />}
            {activeStep === 2 && <NFTCollection />}
            {activeStep === 3 && <CampaignSummary />}
          </Grid>
          <Grid item xs={12} sm={8} sx={{ mt: 6, mb: 6 }}>
            <hr />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                size="large"
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} size="large" sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={handleNext} size="large" variant="contained">
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledDashboardSection>
    </DashboardLayout>
  );
};

export default CampaignCreator;
