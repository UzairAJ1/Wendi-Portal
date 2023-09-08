// PaymentPlansPage.js
import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import Iconify from '../components/iconify';

const paymentPlans = [
  {
    name: 'Plan A',
    description: 'Basic plan with limited features',
    amount: 19.99,
  },
  {
    name: 'Plan B',
    description: 'Standard plan with additional features',
    amount: 29.99,
  },
  {
    name: 'Plan C',
    description: 'Premium plan with all features',
    amount: 49.99,
  },
];

const PaymentPlans = () => {
    const navigate = useNavigate();
  return (
    <div style={{margin:"40px"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>

      <h1>Payment Plans</h1>
      <Button variant="contained" endIcon={<Iconify icon="eva:plus-fill" />} sx={{ background: '#4A276B',  height: "50px", marginTop:"20px"}}
          onClick={()=>{
            // navigate('/dashboard/payments');
          }} 
          > 
             Add
          </Button>
          </div>
      <Grid container spacing={2}>
        {paymentPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plan.description}
                </Typography>
                <Typography variant="h5">
                  Amount: ${plan.amount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginTop:"20px"}}
          onClick={()=>{
            navigate('/dashboard/payments');
            // navigate(-1); 
          }} 
          > 
             Back to Payments Menu
          </Button>
    </div>
  );
};

export default PaymentPlans;
