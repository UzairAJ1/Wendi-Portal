import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, TextField, Paper, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUser } from '../redux/slices/auth';
import { useGlobalSettingsMutation, useGlobalSettingsGetQuery } from '../redux/homeApi/homeApi';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get global settings data
  const { data, error, isLoading, isFetching } = useGlobalSettingsGetQuery();
  const { likeInteractionLimit, likeTimerLimit, zodiacLimit } = data?.data || {};
  const zod = 5;
  const [zodiacMachineLimit, setZodiacMachineLimit] = useState(zodiacLimit || zod);

  console.log(data);

  // State for Like Interaction
  const [freeGifts, setFreeGifts] = useState(likeInteractionLimit?.freeGifts || 11);
  const [paidGifts, setPaidGifts] = useState(likeInteractionLimit?.paidGifts || 20);
  const [giftRenewalTime, setGiftRenewalTime] = useState(likeInteractionLimit?.giftRenewalTime || 24);

  // post
  const [adminApi] = useGlobalSettingsMutation();
  // State for Like Timer
  const [remainingTime, setRemainingTime] = useState(likeTimerLimit || 60);
  const [reportText, setReportText] = useState('');

  const GlobalSettingsCall = async ({ type }) => {
    const dataToSend = {};

    if (type === 'zodiac') {
      dataToSend.zodiacLimit = zodiacMachineLimit;
    } else if (type === 'likeInteractionLimit') {
      dataToSend.likeInteractionLimit = {
        freeGifts,
        giftRenewalTime,
        paidGifts,
      };
    } else if (type === 'likeTimerLimit') {
      dataToSend.likeTimerLimit = remainingTime;
    }

    try {
      const res = await adminApi(dataToSend);
      console.log(res);
      console.log('RES ========', res);
    } catch (error) {
      // Handle API error here
      console.error('API Error:', error);
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

  useEffect(() => {
    if (isLoading) {
      // You can show a loading indicator here if needed
    } else if (error) {
      // Handle the error (e.g., show an error message)
    } else if (data) {
      console.log('Data received:', data);
    }
  }, [isLoading, error, data]);

  useEffect(() => {
    setZodiacMachineLimit(zodiacMachineLimit);
    setFreeGifts(likeInteractionLimit?.freeGifts ? likeInteractionLimit?.freeGifts:freeGifts);
    setPaidGifts(likeInteractionLimit?.paidGifts ? likeInteractionLimit?.paidGifts :  paidGifts);
    setGiftRenewalTime(likeInteractionLimit?.giftRenewalTime ? likeInteractionLimit?.giftRenewalTime : giftRenewalTime);
    setRemainingTime(likeTimerLimit ? likeTimerLimit : remainingTime);
  }, [data]);

  // useEffect(() => {
  //   setZodiacMachineLimit(zodiacMachineLimit);
  //   setFreeGifts(freeGifts);
  //   setPaidGifts(paidGifts);
  //   setGiftRenewalTime(giftRenewalTime);
  //   setRemainingTime(likeTimerLimit);
  // }, [data]);


  

  const logout = () => {
    dispatch(setUser(null));
    navigate('/');
  };

  return (
    <Container>
      <Grid item xs={8} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            logout();
          }}
          sx={{ background: '#4A276B', marginBottom: '20px' }}
        >
          Logout
        </Button>
      </Grid>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Zodiac Machine Feature
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
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
              onClick={() => {
                GlobalSettingsCall({ type: 'zodiac' });
              }}
              sx={{ background: '#4A276B' }}
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
        <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
          Current Like Interaction Limit:
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField label="Free Gifts" type="number" value={freeGifts} onChange={handleFreeGiftsChange} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Paid Gifts" type="number" value={paidGifts} onChange={handlePaidGiftsChange} fullWidth />
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
              onClick={() => {
                GlobalSettingsCall({ type: 'likeInteractionLimit' });
              }}
              sx={{ background: '#4A276B' }}
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                GlobalSettingsCall({ type: 'likeTimerLimit' });
              }}
              sx={{ background: '#4A276B' }}
            >
              Set Timer
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
