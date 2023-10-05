import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import {
  useGetPaymentPlansQuery,
  useAddPaymentPlanMutation,
  useDeletePaymentPlanMutation,
} from '../redux/paymentPlansApi/paymentPlansApi';
import Iconify from '../components/iconify';

const PaymentPlans = () => {
  const { data: paymentPlans, isFetching, isError } = useGetPaymentPlansQuery();
  const [addPaymentPlan, addPaymentPlanResults] = useAddPaymentPlanMutation();
  const [deletePaymentPlan, deletePaymentPlanResults] = useDeletePaymentPlanMutation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  console.log(selectedPlan);
  const [paymentPlan, setPaymentPlan] = useState({
    name: '',
    description: '',
    amount: '',
    likesLimit: '',
    giftsLimit: '',
    spinsLimit: '',
    seeLikes: false,
    transactionId: '',
    resetDuration: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChanges = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setPaymentPlan({ ...paymentPlan, [name]: newValue });
  };

  const handleSubmit = () => {
    if (
      !paymentPlan.name ||
      !paymentPlan.description ||
      !paymentPlan.amount ||
      !paymentPlan.likesLimit ||
      !paymentPlan.giftsLimit ||
      !paymentPlan.spinsLimit ||
      !paymentPlan.transactionId ||
      !paymentPlan.resetDuration
    ) {
      alert('Please fill out all required fields.');
      return;
    }
    addPaymentPlan(paymentPlan);
    setPaymentPlan({
      name: '',
      description: '',
      amount: '',
      likesLimit: '',
      giftsLimit: '',
      spinsLimit: '',
      seeLikes: false,
      transactionId: '',
      resetDuration: '',
    });
    setOpen(false);
  };

  // Function to set the payment plan to be deleted
  const handleDeleteClick = (plan) => {
    setSelectedPlan(plan);
  };

  // Function to clear the selected payment plan (to cancel the delete action)
  const cancelDelete = () => {
    setSelectedPlan(null);
  };

  // Function to confirm and delete the payment plan
  const confirmDelete = () => {
    if (selectedPlan) {
      deletePaymentPlan(selectedPlan._id); // Assuming you have an 'id' property in your payment plan data
      setSelectedPlan(null);
    }
  };

  const [open, setOpen] = useState(false);

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
        {paymentPlans?.data?.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" component="div">
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plan.description}
                </Typography>
                <Typography variant="subtitle1">
                  Likes Limit: {plan.likesLimit === -1 ? 'Unlimited' : plan.likesLimit}
                </Typography>
                <Typography variant="subtitle1">
                  Gifts Limit: {plan.giftsLimit === -1 ? 'Unlimited' : plan.giftsLimit}
                </Typography>
                <Typography variant="subtitle1">
                  Spins Limit: {plan.spinsLimit === -1 ? 'Unlimited' : plan.spinsLimit}
                </Typography>
                <Typography variant="subtitle1">Reset Duration: {plan.resetDuration} hours</Typography>
                <Typography variant="subtitle1">See Likes: {plan.seeLikes ? 'true' : 'false'}</Typography>
                <Typography variant="subtitle1">Amount: {plan.amount}</Typography>
                <Button variant="outlined" color="error" onClick={() => handleDeleteClick(plan)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete confirmation dialog */}
      <Dialog open={!!selectedPlan} onClose={cancelDelete}>
        <DialogTitle>Delete Payment Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this payment plan? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle variant="h4">Payment Plan</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={paymentPlan.name}
              onChange={handleInputChanges}
              fullWidth
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={paymentPlan.description}
              onChange={handleInputChanges}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={paymentPlan.amount}
              onChange={handleInputChanges}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="Likes Limit"
              type="number"
              name="likesLimit"
              value={paymentPlan.likesLimit}
              onChange={handleInputChanges}
              fullWidth
            />
            <TextField
              label="Spins Limit"
              type="number"
              name="spinsLimit"
              value={paymentPlan.spinsLimit}
              onChange={handleInputChanges}
              fullWidth
            />
            <TextField
              label="Gifts Limit"
              type="number"
              name="giftsLimit"
              value={paymentPlan.giftsLimit}
              onChange={handleInputChanges}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <FormControlLabel
              control={<Checkbox name="seeLikes" checked={paymentPlan.seeLikes} onChange={handleInputChanges} />}
              label="See Likes"
              sx={{
                width: '100%',
                border: '1px solid #80808036',
                borderRadius: '5px',
                marginLeft: '0',
                marginRight: '0',
              }}
            />
            <TextField
              label="Transaction ID"
              type="string"
              name="transactionId"
              value={paymentPlan.transactionId}
              onChange={handleInputChanges}
              fullWidth
            />
            <TextField
              label="Reset Duration (Hours)"
              type="number"
              name="resetDuration"
              value={paymentPlan.resetDuration}
              onChange={handleInputChanges}
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
