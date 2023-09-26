// PremiumFeaturesPage.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Iconify from '../components/iconify';
import { useGetFeaturesQuery, useAddFeatureMutation } from '../redux/featuresApi/featuresApi';

const premiumFeatures = [
  {
    name: 'Feature 1',
    description: 'Access to premium feature 1',
  },
  {
    name: 'Feature 2',
    description: 'Access to premium feature 2',
  },
  {
    name: 'Feature 3',
    description: 'Access to premium feature 3',
  },
];

const PremiumFeatures = () => {
  const navigate = useNavigate();
  const { data: featuresData, isFetching } = useGetFeaturesQuery();
  const [addFeature] = useAddFeatureMutation();
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState(premiumFeatures);
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

  // to be used when api is working
  // const handleSubmit = async () => {
  //   if (feature.name && feature.description) {
  //     await addFeature(feature);
  //     setFeature({});
  //     setOpen(false);
  //   }
  // };

  const handleSubmit = () => {
    if (feature.name && feature.description) {
      setFeatures([...features, feature]);
      setFeature({});
      setOpen(false);
    }
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
        {features.map((feature, index) => (
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
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="sm">
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
