import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepIndicator,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Textarea,
  Sheet,
  Stack
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const CaseIntake = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const steps = ['Personal Details', 'Last Known Location', 'Characteristics'];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <FormControl required>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="Enter legal name" />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Age</FormLabel>
                <Input type="number" />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Gender</FormLabel>
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="non-binary">Non-binary</Option>
                  <Option value="other">Other</Option>
                </Select>
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel>Ethnicity</FormLabel>
              <Select placeholder="Select ethnicity">
                <Option value="asian">Asian</Option>
                <Option value="black">Black</Option>
                <Option value="hispanic">Hispanic</Option>
                <Option value="white">White</Option>
                <Option value="other">Other</Option>
              </Select>
            </FormControl>
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={2}>
            <FormControl required>
              <FormLabel>Last Known Address</FormLabel>
              <Input placeholder="123 Main St, City, State" />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Latitude</FormLabel>
                <Input placeholder="0.0000" />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Longitude</FormLabel>
                <Input placeholder="0.0000" />
              </FormControl>
            </Box>
            <Sheet variant="outlined" sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.level1' }}>
              <Typography level="body-sm">Map Selector Placeholder</Typography>
            </Sheet>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Height</FormLabel>
                <Input placeholder="e.g. 5 foot 10 inches" />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Weight</FormLabel>
                <Input placeholder="e.g. 160 lbs" />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel>Behavioral Signatures</FormLabel>
              <Textarea minRows={4} placeholder="Describe specific behavioral patterns or routines..." />
            </FormControl>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography level="h2" sx={{ mb: 4, textAlign: 'center' }}>Case Intake</Typography>

      <Stepper sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step
            key={label}
            indicator={
              <StepIndicator variant={activeStep >= index ? 'solid' : 'outlined'} color="primary">
                {index + 1}
              </StepIndicator>
            }
          >
            {label}
          </Step>
        ))}
      </Stepper>

      <Sheet variant="outlined" sx={{ p: 4, borderRadius: 'md', mb: 4 }}>
        {renderStepContent(activeStep)}
      </Sheet>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="plain"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={() => navigate('/')}>Submit Case</Button>
        ) : (
          <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button>
        )}
      </Box>
    </Box>
  );
};

export default CaseIntake;
