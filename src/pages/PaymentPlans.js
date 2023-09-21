// PaymentPlansPage.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import Iconify from '../components/iconify';

const paymentPlans = [
  {
    name: 'Plan A',
    description: 'Basic plan with limited features',
    likesLimit: 40,
    likesResetDuration: 24,
  },
  {
    name: 'Plan B',
    description: 'Standard plan with additional features',
    likesLimit: 100,
    likesResetDuration: 48,
  },
  {
    name: 'Plan C',
    description: 'Premium plan with all features',
    likesLimit: 300,
    likesResetDuration: 76,
  },
];

const PaymentPlans = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [paymentPlansData, setPaymentPlansData] = useState(paymentPlans);
  const [paymentPlan, setPaymentPlan] = useState({
    name: '',
    description: '',
    amount: '',
    likesLimit: null,
    giftsLimit: null,
    spinsLimit: null,
    seeLikes: false,
    transactionId: '',
    likesResetDuration: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChnages = (e) => {
    const { name, value } = e.target;
    setPaymentPlan({ ...paymentPlan, [name]: value });
  };

  const handleSubmit = () => {
    const requiredFields = [
      'name',
      'description',
      'likesLimit',
      'likesResetDuration',
      'giftsLimit',
      'spinsLimit',
      'seeLikes',
      'transactionId',
      'amount',
    ];

    const hasAllRequiredFields = requiredFields.every((field) => paymentPlan[field]);

    if (hasAllRequiredFields) {
      setPaymentPlansData([...paymentPlansData, paymentPlan]);
      setPaymentPlan({});
      setOpen(false);
    }
  };

  return (
    <div style={{ margin: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Payment Plans</h1>
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
        {paymentPlansData.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" component="div">
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plan.description}
                </Typography>
                <Typography variant="h5">Likes Limit {plan.likesLimit}</Typography>
                <Typography variant="h5">Reset Duration {plan.likesResetDuration}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="md">
        <DialogTitle variant="h4">Payment Plan</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={paymentPlan.name}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={paymentPlan.description}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={paymentPlan.amount}
              onChange={handleInputChnages}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="Likes Limit"
              type="number"
              name="likesLimit"
              value={paymentPlan.likesLimit}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Spins Limit"
              type="number"
              name="spinsLimit"
              value={paymentPlan.spinsLimit}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Gifts Limit"
              type="number"
              name="giftsLimit"
              value={paymentPlan.giftsLimit}
              onChange={handleInputChnages}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="See Likes"
              type="number"
              name="seeLikes"
              value={paymentPlan.seeLikes}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Transaction ID"
              type="string"
              name="transactionId"
              value={paymentPlan.transactionId}
              onChange={handleInputChnages}
              fullWidth
            />
            <TextField
              label="Likes Reset Duration (Hours)"
              type="text"
              name="likesResetDuration"
              value={paymentPlan.likesResetDuration}
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

export default PaymentPlans;
