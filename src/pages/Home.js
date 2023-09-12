// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Box,
  IconButton,
} from '@mui/material';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

import {  useGlobalSettingsMutation, useGlobalSettingsGetQuery } from '../redux/homeApi/homeApi';
// import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const [zodiacMachineLimit, setZodiacMachineLimit] = useState(5);
  // State for Like Interaction


  const [freeGifts, setFreeGifts] = useState(10);
  const [paidGifts, setPaidGifts] = useState(20);
  const [giftRenewalTime, setGiftRenewalTime] = useState(24);
  // post
  const [adminApi] =  useGlobalSettingsMutation()
// get
// const [adminGetApi] =  useGlobalSettingsGetQuery()
  // State for Like Timer
  const [remainingTime, setRemainingTime] = useState(60);
  const [reports, setReports] = useState([
    {
        userId: 1,
      reporter: 'Johny Sings',
      reportedUser: 'Sandy Williams',
      text: 'Inappropriate behavior',
      status: 'Pending', // Initial status, you can use 'Pending' or 'Active'.
    },
    {
        userId: 2,
        reporter: 'Kiara Wins',
        reportedUser: 'Mandy Randy',
        text: 'Abusive Language',
        status: 'Pending', // Initial status, you can use 'Pending' or 'Active'.
      },
    // ... other reports
  ]);
  const [reportText, setReportText] = useState('');

  const GlobalSettingsCall = async ({ type }) => {
    const dataToSend = {};
  
    if (type === "zodiac") {
      dataToSend.zodiacLimit = zodiacMachineLimit;
    } else if (type === "likeInteractionLimit") {
      dataToSend.likeInteractionLimit = {
        freeGifts,
        giftRenewalTime,
        paidGifts,
      };
    } else if (type === "likeTimerLimit") {
      dataToSend.likeTimerLimit = remainingTime;
    }
  
    try {
      const res = await adminApi(dataToSend);
      console.log("RES ========", res);
    } catch (error) {
      // Handle API error here
      console.error("API Error:", error);
    }
  };
  
  const handleFreeGiftsChange = (e) => {
    setFreeGifts(e.target.value);
  };
  const handleZodiacMachineLimitChange = (e) => {
    setZodiacMachineLimit(e.target.value);
  };

  const handlePaidGiftsChange = (e) => {
    setPaidGifts(e.target.value);
  };

  const handleGiftRenewalTimeChange = (e) => {
    setGiftRenewalTime(e.target.value);
  };

  const handleRemainingTimeChange = (e) => {
    setRemainingTime(e.target.value);
  };

  const handleSetLikeInteraction = () => {

    // You can implement logic here to send the new values to the server
    // For now, we'll just display an alert
    alert(`Set Free Gifts to ${freeGifts}, Paid Gifts to ${paidGifts}, Gift Renewal Time to ${giftRenewalTime} hours`);
  };

  const handleSetLikeTimer = () => {
    // You can implement logic here to send the new time to the server
    // For now, we'll just display an alert
    alert(`Set Remaining Time to ${remainingTime} minutes`);
  };

  const handleSuspend = (userId) => {
    // Implement suspension logic here (e.g., send a request to suspend the user).
    // Update the user's status or remove them from the list of reports.
    const updatedReports = reports.filter((report) => report.userId !== userId);
    setReports(updatedReports);
  };

  const handleDelete = (userId) => {
    // Implement user deletion logic here (e.g., send a request to delete the user).
    // Update the user's status or remove them from the list of reports.
    const updatedReports = reports.filter((report) => report.userId !== userId);
    setReports(updatedReports);
  };

  const { data, error, isLoading } = useGlobalSettingsGetQuery();

  useEffect(() => {
  
    if (isLoading) {
      // You can show a loading indicator here if needed
    } else if (error) {
      // Handle the error (e.g., show an error message)
    } else if (data) {

      console.log('Data received:', data);
    }
  }, [isLoading, error, data]);



  return (
    <Container>
              <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Zodiac Machine Feature
        </Typography>
        <Typography variant="h6" gutterBottom sx={{marginBottom:"20px"}}>
          {/* Current Limit: {data.zodiacMachineLimit} */}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="Set Limit"
              type="number"
              value={zodiacMachineLimit}
              onChange={handleZodiacMachineLimitChange}
              fullWidth

            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={()=> { GlobalSettingsCall({type:"zodiac"}) }}
              sx={{background:"#4A276B"}}
            >
              Set Limit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Like Interaction
        </Typography>
        <Typography variant="h6" gutterBottom sx={{marginBottom:"20px"}}>
          Current Like Interaction Limit:
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              label="Free Gifts"
              type="number"
              value={freeGifts}
              onChange={handleFreeGiftsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Paid Gifts"
              type="number"
              value={paidGifts}
              onChange={handlePaidGiftsChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Gift Renewal Time (hours)"
              type="number"
              value={giftRenewalTime}
              onChange={handleGiftRenewalTimeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"

              onClick={() => { GlobalSettingsCall({type:"likeInteractionLimit"})}}
              sx={{background:"#4A276B"}}
            >
              Set Interaction Limit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Like Timer */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Like Timer
        </Typography>
        <Typography variant="h6" gutterBottom sx={{marginBottom:"20px"}}>
          Current Like Timer:
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Remaining Time (minutes)"
              type="number"
              value={remainingTime}
         
              onChange={handleRemainingTimeChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { GlobalSettingsCall({type:"likeTimerLimit"})}}
              sx={{background:"#4A276B"}}
            >
              Set Timer
            </Button>
          </Grid>
        </Grid>
      </Paper>


      <Paper elevation={3} style={{ padding: '16px', marginBottom: '30px' }}>
      <Typography variant="h5" gutterBottom>
        Reported Users
      </Typography>
      <Box mt={2}>
        {reports.map((report) => (
          <Box
            key={report.userId}
            display="flex"
            
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            p={2}
          >
            <div>


            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "3px", marginBottom:"20px" }}>
                <Typography variant="subtitle1">
                Reported User: 
                </Typography>
                <Typography variant="body1">
                     {report.reporter}
                  </Typography>
              </Paper>

            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "3px", marginBottom:"20px" }}>
                <Typography variant="subtitle1">
                Reported By: 
                </Typography>
                <Typography variant="body1">
                {report.reportedUser}
                  </Typography>
              </Paper>

              <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "3px", marginBottom:"20px" }}>
                <Typography variant="subtitle1">
                Reason to Report:
                </Typography>
                <Typography variant="body1">
              {report.text}
                  </Typography>
              </Paper>

           <div style={{display:"flex", gap:"5px", justifySelf:"flex-end"}}>
              <Button
              variant="contained"
              color="primary"
              onClick={() => handleSuspend(report.userId)}
              sx={{background:"#4A276B"}}
            >
              Suspend User
            </Button>
              <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(report.userId)}
              sx={{background:"#4A276B"}}
            >
              Delete User
            </Button>
            </div>
            </div>

          </Box>
        ))}
      </Box>
      {
        reports?.length === 0  &&
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            Nothing To Show
        </Paper>
    }
    </Paper>

    </Container>
  );
};

export default Home;