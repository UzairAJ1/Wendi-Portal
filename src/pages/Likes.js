// Import necessary dependencies
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
} from '@mui/material';

const Likes = () => {

  // State for Like Interaction
  const [freeGifts, setFreeGifts] = useState(10);
  const [paidGifts, setPaidGifts] = useState(20);
  const [giftRenewalTime, setGiftRenewalTime] = useState(24);

  // State for Like Timer
  const [remainingTime, setRemainingTime] = useState(60);


  const handleFreeGiftsChange = (e) => {
    setFreeGifts(e.target.value);
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

  return (
    <Container>
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
              onClick={handleSetLikeInteraction}
              sx={{background:"#4A276B"}}
            >
              Set Interaction Limit
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Like Timer */}
      <Paper elevation={3} style={{ padding: '20px' }}>
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
              onClick={handleSetLikeTimer}
              sx={{background:"#4A276B"}}
            >
              Set Timer
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Likes;