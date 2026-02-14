import styles from './Dashboard.module.css';
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  Grid,
  Input,
  IconButton,
  Sheet,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Avatar
} from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GavelIcon from '@mui/icons-material/Gavel';
import SettingsIcon from '@mui/icons-material/Settings';
import FaceIcon from '@mui/icons-material/Face';
import DescriptionIcon from '@mui/icons-material/Description';
import ExploreIcon from '@mui/icons-material/Explore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const cases = [
    { id: 1, name: 'Jane Thompson', status: 'Active', color: 'primary', summary: "Last seen at O'Hare Terminal 3, June 12. Wearing navy trench coat." },
    { id: 2, name: 'Marcus Wright', status: 'Cold', color: 'neutral', summary: "Missing since 2018. New digital lead from social media archives." },
    { id: 3, name: 'Sarah Jenkins', status: 'Recovered', color: 'success', summary: "Located July 02 in Miami. Case file pending final documentation." },
  ];

  return (
    <Box className={styles.dashboardContainer} sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* Sidebar */}
      <Sheet
        sx={{
          width: 240,
          borderRight: '1px solid',
          borderColor: 'divider',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Typography level="h4" sx={{ mb: 4 }}>Out&Found</Typography>
        <List>
          <ListItem>
            <ListItemButton selected onClick={() => navigate('/')}>
              <ListItemDecorator><DashboardIcon /></ListItemDecorator>
              Dashboard
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/intake')}>
              <ListItemDecorator><AddCircleIcon /></ListItemDecorator>
              Case Intake
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/legal')}>
              <ListItemDecorator><GavelIcon /></ListItemDecorator>
              Legal Tools
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator><SettingsIcon /></ListItemDecorator>
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Sheet>

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 }, bgcolor: 'background.surface' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Input
            placeholder="Search cases..."
            startDecorator={<SearchIcon />}
            sx={{ width: { xs: '100%', md: 400 } }}
          />
          <Avatar variant="soft" />
        </Box>

        <Typography level="h2" sx={{ mb: 2 }}>Active Cases</Typography>

        <Grid container spacing={2}>
          {cases.map((c) => (
            <Grid key={c.id} xs={12} sm={6} md={4}>
              <Card variant="outlined" className={styles.caseCard}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Typography level="title-lg">{c.name}</Typography>
                  <Chip variant="soft" color={c.color as any} size="sm">{c.status}</Chip>
                </Box>
                <Typography level="body-sm" sx={{ my: 1 }}>{c.summary}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                  <Button variant="soft" startDecorator={<FaceIcon />} size="sm">
                    Request Age Progression
                  </Button>
                  <Button variant="soft" startDecorator={<DescriptionIcon />} size="sm" onClick={() => navigate('/legal')}>
                    FOIA Request
                  </Button>
                  <Button variant="soft" startDecorator={<ExploreIcon />} size="sm">
                    View Geo Profile
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
