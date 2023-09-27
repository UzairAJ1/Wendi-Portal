import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import Iconify from '../components/iconify';
import { useGetFeaturesQuery, useAddFeatureMutation } from '../redux/featuresApi/featuresApi';

const PremiumFeatures = () => {
  const { data: featuresData, isFetching, isError } = useGetFeaturesQuery();
  const [addFeature, addFeatureResults] = useAddFeatureMutation();
  const [open, setOpen] = useState(false);
  const [feature, setFeature] = useState({
    name: '',
    description: '',
  });

  console.log(featuresData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChnages = (e) => {
    const { name, value } = e.target;
    setFeature({ ...feature, [name]: value });
  };

  const handleSubmit = () => {
    if (!feature.name || !feature.description) {
      alert('Please fill out all required fields.');
      return;
    }

    addFeature(feature);

    setFeature({
      name: '',
      description: '',
    });
    setOpen(false);
  };

  return (
    <div style={{ margin: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Premium Features</h1>
        <Button
          variant="contained"
          endIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ background: '#4A276B', height: '50px', marginTop: '20px' }}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      </div>
      <Grid container spacing={2}>
        {featuresData?.data?.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {feature.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h4">Feature</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ marginTop: '8px' }}>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={feature.name}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={feature.description}
              onChange={handleInputChnages}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ marginBottom: '12px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PremiumFeatures;
