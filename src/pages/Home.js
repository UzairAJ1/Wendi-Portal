import React, { useState, useEffect } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { Container, Typography, Button, Grid, TextField, Paper, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setUser } from '../redux/slices/auth';
import { useGlobalSettingsMutation, useGlobalSettingsGetQuery } from '../redux/homeApi/homeApi';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Get global settings data
  const { data, error, isLoading, isFetching } = useGlobalSettingsGetQuery();

  const [zodiacLimit, setzodiacLimit] = useState(1);
  const [zodiacTimeLimit, setZodiacTimeLimit] = useState(1);
  // State for Like Interaction
  const [freeGifts, setFreeGifts] = useState(1);
  const [paidGifts, setPaidGifts] = useState(1);
  const [giftRenewalTime, setGiftRenewalTime] = useState(1);
  // post
  const [adminApi] = useGlobalSettingsMutation();
  // State for Like Timer
  const [remainingTime, setRemainingTime] = useState(1);
  const [totalLikes, setTotallikes] = useState(1);
  const [reportText, setReportText] = useState('');

  const GlobalSettingsCall = async ({ type }) => {
    const dataToSend = {};

    if (type === 'zodiac') {
      // Send zodiacLimit in the request body
      dataToSend.zodiacLimit = zodiacLimit;
      dataToSend.zodiacTimeLimit = zodiacTimeLimit;
      toast.success('Zodiac details updated successfully');
      console.log('zodiac settings:', dataToSend);
    } else if (type === 'giftInteractionLimit') {
      dataToSend.giftInteractionLimit = {
        freeGifts,
        giftRenewalTime,
        paidGifts,
      };
      toast.success('Gift details updated successfully');
    } else if (type === 'likeTimerLimit') {
      dataToSend.likeTimerLimit = remainingTime;
      toast.success('Remaining time updated successfully');
    } else if (type === 'likeLimit') {
      dataToSend.likeLimit = totalLikes;

      toast.success('Like details updated successfully');
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

  const handlezodiacLimitChange = (e) => {
    setzodiacLimit(e.target.value);
  };

  const handlezodiacTimeLimitChange = (e) => {
    setZodiacTimeLimit(e.target.value);
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
  const handleTotalLikesChange = (e) => {
    setTotallikes(e.target.value);
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
      console.log('Data received:', data.data);
    }
  }, [isLoading, error, data]);

  useEffect(() => {
    if (data) {
      setFreeGifts(data.data?.giftInteractionLimit.freeGifts || 1);
      setPaidGifts(data.data?.giftInteractionLimit.paidGifts || 1);
      setGiftRenewalTime(data.data?.giftInteractionLimit.giftRenewalTime || 1);
      setzodiacLimit(data.data?.zodiacLimit || 1);
      setRemainingTime(data.data?.likeTimerLimit || 1);
      setTotallikes(data.data?.likeLimit || 1);
    }
  }, [data]);

  // useEffect(() => {
  //   setzodiacLimit(zodiacLimit);
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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Zodiac Machine Feature" value="1" />
            <Tab label="Gift Interaction" value="2" />
            <Tab label="Like Interaction" value="3" />
          </TabList>
        </Box>
        <Container>
          <TabPanel value="1">
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" gutterBottom>
                Zodiac Machine Feature
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
                {/* Current Limit: {data.zodiacLimit} */}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    label="Set Limit"
                    type="number"
                    value={zodiacLimit}
                    onChange={handlezodiacLimitChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Set Duration(Hours)"
                    type="number"
                    value={zodiacTimeLimit}
                    onChange={handlezodiacTimeLimitChange}
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
          </TabPanel>
          <TabPanel value="2">
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" gutterBottom>
                Gift Interaction
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
                Current Gift Interaction Limit:
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
                    onClick={() => {
                      GlobalSettingsCall({ type: 'giftInteractionLimit' });
                    }}
                    sx={{ background: '#4A276B' }}
                  >
                    Set Interaction Limit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>

          {/* Like Timer */}
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

            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" gutterBottom>
                Total Likes
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: '20px' }}>
                Current Total likes:
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    label="Likes"
                    type="number"
                    value={totalLikes}
                    onChange={handleTotalLikesChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      GlobalSettingsCall({ type: 'likeLimit' });
                    }}
                    sx={{ background: '#4A276B' }}
                  >
                    Set Likes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </Container>
      </TabContext>
    </Box>
  );
};

export default Home;
