// PremiumFeaturesPage.js
import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Iconify from '../components/iconify';

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
  return (
    <div style={{ margin: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Premium Features</h1>
        <Button
          variant="contained"
          endIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ background: '#4A276B', height: '50px', marginTop: '20px' }}
          onClick={() => {
            // navigate('/dashboard/payments');
          }}
        >
          Add
        </Button>
      </div>
      <Grid container spacing={2}>
        {premiumFeatures.map((feature, index) => (
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
      {/* <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginTop:"20px"}}
          onClick={()=>{
            navigate('/dashboard/payments');
            // navigate(-1); 
          }} 
          > 
              Back to Payments Menu
          </Button> */}
    </div>
  );
};

export default PremiumFeatures;
