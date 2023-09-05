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

const ZodiacMachine = () => {
  const [zodiacMachineLimit, setZodiacMachineLimit] = useState(5);

  // State for Like Interaction
  const [freeGifts, setFreeGifts] = useState(10);
  const [paidGifts, setPaidGifts] = useState(20);
  const [giftRenewalTime, setGiftRenewalTime] = useState(24);

  // State for Like Timer
  const [remainingTime, setRemainingTime] = useState(60);

  // Functions to handle settings changes
  const handleZodiacMachineLimitChange = (e) => {
    setZodiacMachineLimit(e.target.value);
  };

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

  const handleSetZodiacMachineLimit = () => {
    // You can implement logic here to send the new limit to the server
    // For now, we'll just display an alert
    alert(`Set Zodiac Machine Limit to ${zodiacMachineLimit}`);
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
      {/* Zodiac Machine Feature */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Zodiac Machine Feature
        </Typography>
        <Typography variant="h6" gutterBottom sx={{marginBottom:"20px"}}>
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
              sx={{background:"#4A276B"}}
            >
              Set Limit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ZodiacMachine;