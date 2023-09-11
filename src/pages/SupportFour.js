import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
  Box,
  TextareaAutosize,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';



const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const Supportfour = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
    <Box sx={{ width: '100%', typography: 'body1' }}>
<TabContext value={value}>
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Reporting and Analytics" value="1" />
            <Tab label="Ticket Management" value="2" />
            <Tab label="Feedback Management" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginLeft: '50px',
          gap: '25px',
        }}
      >
        
        {/* <div style={{ display: 'flex' }}>
          <Button
            variant="contained"
            sx={{ background: '#4A276B', height: '50px', marginRight: '20px', width: '195px' }}
            onClick={() => {
              navigate('/supportandfeedback');
            }}
          >
            Ticket Management
          </Button>
          <Button
            variant="contained"
            sx={{ background: '#4A276B', height: '50px', marginRight: '20px', width: '195px' }}
            onClick={() => {
              navigate('/feedbackmanagement');
            }}
          >
            Feedback Management
          </Button>
        </div> */}
        {/* <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
          onClick={()=>{
            navigate('/premiumfeatures');
          }} 
          > 
            Premium feautures
          </Button>
          <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
          onClick={()=>{
            navigate('/paymentplans');
          }} 
          > 
            Payment plans
          </Button> */}
        <FormContainer maxWidth="md">
          <Typography variant="h5" gutterBottom>
            Reporting and Analytics
          </Typography>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Metrics:"
              // subheader="(+43%) than last year"
              labelStyles={{ fontSize: '32px' }}
              chartData={[
                { label: 'Response Times', value: (150 / 500) * 100 },
                { label: 'Ticket Resolution Rates', value: (390 / 500) * 100 },
                { label: 'User Satisfaction Ratings', value: (448 / 500) * 100 },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ marginY: '20px' }}>
            <AppCurrentSubject
              title="Different trends"
              chartLabels={['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']}
              chartData={[
                { name: 'Male', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Female', data: [20, 30, 40, 80, 20, 80] },
                // { name: 'Feature 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
        </FormContainer>
      </div>
      </TabPanel>


      <TabPanel value="2">
    ok
    </TabPanel>


      </TabContext>
      </Box>



    </>
  );
};

export default Supportfour;
