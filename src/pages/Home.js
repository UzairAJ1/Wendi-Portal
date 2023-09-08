// Import necessary dependencies
import React, { useState } from 'react';
import { Container, Typography, Button, Grid, TextField, Paper, Box, IconButton, duration } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

// import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [zodiacMachineLimit, setZodiacMachineLimit] = useState(5);
  // State for Like Interaction
  const [likes, setLikes] = useState(10);
  const [amount, setAmount] = useState(20);
  const [duration, setDuration] = useState(24);
  const [isEditedLikeInteraction, setIsEditedLikeInteraction] = useState(false);

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
  const [value, setValue] = React.useState('1');

  const handleSetZodiacMachineLimit = () => {
    // You can implement logic here to send the new limit to the server
    // For now, we'll just display an alert
    alert(`Set Zodiac Machine Limit to ${zodiacMachineLimit}`);
  };
  const handlelikesChange = (e) => {
    setLikes(e.target.value);
  };
  const handleZodiacMachineLimitChange = (e) => {
    setZodiacMachineLimit(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleRemainingTimeChange = (e) => {
    setRemainingTime(e.target.value);
  };

  const handleSetLikeInteraction = () => {
    // You can implement logic here to send the new values to the server
    // For now, we'll just display an alert
    alert(`Set Likes to ${likes}, Amount to ${amount}, Gift Renewal Time to ${duration} hours`);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Zodiac Machine Feature" value="1" />
            <Tab label="Like Interaction" value="2" />
            <Tab label="Like Timer" value="3" />
            <Tab label="Reported Users" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Zodiac Machine Feature
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
              Current Limit:
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
                  onClick={handleSetZodiacMachineLimit}
                  sx={{ background: '#4A276B' }}
                >
                  Set Limit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="2">
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Like Interaction
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
              Current Like Interaction Limit:
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Likes"
                  type="number"
                  value={likes}
                  onChange={handlelikesChange}
                  fullWidth
                  disabled={isEditedLikeInteraction}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  fullWidth
                  disabled={isEditedLikeInteraction}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Duration (hours)"
                  type="number"
                  value={duration}
                  onChange={handleDurationChange}
                  fullWidth
                  disabled={isEditedLikeInteraction}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSetLikeInteraction}
                  sx={{ background: '#4A276B' }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="3">
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Like Timer
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
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
                <Button variant="contained" color="primary" onClick={handleSetLikeTimer} sx={{ background: '#4A276B' }}>
                  Set Timer
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value="4">
          <Paper elevation={3} style={{ padding: '16px', marginBottom: '30px' }}>
            <Typography variant="h5" gutterBottom>
              Reported Users
            </Typography>
            <Box mt={2}>
              {reports.map((report) => (
                <Box key={report.userId} display="flex" alignItems="center" justifyContent="space-between" mt={1} p={2}>
                  <div>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '3px', marginBottom: '20px' }}>
                      <Typography variant="subtitle1">Reported User:</Typography>
                      <Typography variant="body1">{report.reporter}</Typography>
                    </Paper>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '3px', marginBottom: '20px' }}>
                      <Typography variant="subtitle1">Reported By:</Typography>
                      <Typography variant="body1">{report.reportedUser}</Typography>
                    </Paper>
                    <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '3px', marginBottom: '20px' }}>
                      <Typography variant="subtitle1">Reason to Report:</Typography>
                      <Typography variant="body1">{report.text}</Typography>
                    </Paper>
                    <div style={{ display: 'flex', gap: '5px', justifySelf: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSuspend(report.userId)}
                        sx={{ background: '#4A276B' }}
                      >
                        Suspend User
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(report.userId)}
                        sx={{ background: '#4A276B' }}
                      >
                        Delete User
                      </Button>
                    </div>
                  </div>
                </Box>
              ))}
            </Box>
            {reports?.length === 0 && (
              <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                Nothing To Show
              </Paper>
            )}
          </Paper>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;
