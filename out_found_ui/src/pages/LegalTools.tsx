import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Sheet,
  Stack,
  Divider
} from '@mui/joy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SendIcon from '@mui/icons-material/Send';

const LegalTools = () => {
  const [selectedCase, setSelectedCase] = useState('');

  const cases = [
    { id: 'OF-2024-8892', name: 'Jane Thompson' },
    { id: 'OF-2024-8893', name: 'Marcus Wright' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography level="h2" sx={{ mb: 4 }}>Legal & FOIA Request Generator</Typography>

      <Grid container spacing={4}>
        <Grid xs={12} md={5}>
          <Sheet variant="outlined" sx={{ p: 3, borderRadius: 'md' }}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Select Case</FormLabel>
                <Select placeholder="Choose a case..." onChange={(_, v) => setSelectedCase(v as string)}>
                  {cases.map((c) => (
                    <Option key={c.id} value={c.id}>{c.name} ({c.id})</Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Target Law Enforcement Agency</FormLabel>
                <Input placeholder="e.g. Chicago Police Department" />
              </FormControl>

              <FormControl>
                <FormLabel>Requester Name</FormLabel>
                <Input placeholder="Your full name" />
              </FormControl>

              <FormControl>
                <FormLabel>Contact Information</FormLabel>
                <Input placeholder="Email or Phone" />
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button fullWidth startDecorator={<FileDownloadIcon />}>Download PDF</Button>
                <Button fullWidth variant="soft" startDecorator={<SendIcon />}>Send via Email</Button>
              </Box>
            </Stack>
          </Sheet>
        </Grid>

        <Grid xs={12} md={7}>
          <Sheet
            variant="soft"
            color="neutral"
            sx={{
              p: 4,
              borderRadius: 'md',
              minHeight: 500,
              fontFamily: 'serif',
              bgcolor: 'background.surface',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography level="h4" sx={{ mb: 2, textAlign: 'center', fontFamily: 'serif' }}>
              FREEDOM OF INFORMATION ACT REQUEST
            </Typography>
            <Divider sx={{ mb: 4 }} />

            <Typography sx={{ mb: 2 }}>To: FOIA Officer</Typography>
            <Typography sx={{ mb: 4 }}>[Target Agency Name]</Typography>

            <Typography sx={{ mb: 4 }}>
              Pursuant to the Freedom of Information Act, I hereby request copies of any and all records related to the investigation of {selectedCase ? 'Case #' + selectedCase : '[Selected Case]'}.
            </Typography>

            <Typography sx={{ mb: 4 }}>
              This request includes but is not limited to:
              <ul>
                <li>Initial police reports</li>
                <li>911 dispatch logs</li>
                <li>Body-worn camera footage</li>
                <li>Witness statements</li>
              </ul>
            </Typography>

            <Typography sx={{ mt: 8 }}>Sincerely,</Typography>
            <Typography sx={{ mt: 1 }}>[Requester Name]</Typography>
          </Sheet>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LegalTools;
