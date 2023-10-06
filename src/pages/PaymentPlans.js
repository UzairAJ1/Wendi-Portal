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
  useUpdatePaymentPlanMutation
} from '../redux/paymentPlansApi/paymentPlansApi';
import Iconify from '../components/iconify';

const PaymentPlans = () => {
  const { data: paymentPlans, isFetching, isError } = useGetPaymentPlansQuery();
  const [addPaymentPlan, addPaymentPlanResults] = useAddPaymentPlanMutation();
  const [deletePaymentPlan, deletePaymentPlanResults] = useDeletePaymentPlanMutation();
  const [updatePaymentPlanApi] = useUpdatePaymentPlanMutation(); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false)
  const [updateSelectedPlan, setUpdateSelectedPlan] = useState(null);
  
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
  const [updatePaymentPlan, setUpdatePaymentPlan] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdateClickOpen = () => {
    setUpdateOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const handleInputChanges = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setPaymentPlan({ ...paymentPlan, [name]: newValue });
  };
const updateSubmit = () => {
  updatePaymentPlanApi({dataToUpdate:updateSelectedPlan, id:updateSelectedPlan._id});
  setUpdateOpen(false);
}
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
  const handleUpdateClick = (updatePlan) => {
    setUpdateOpen((true));
    setUpdateSelectedPlan(updatePlan);
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
  const [openUpdate, setOpenUpdate] = useState(false);
  

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
               <div style={{display:"flex", justifyContent:"space-around", marginTop:"20px"}}>
                <Button variant="outlined" color="error" onClick={() => handleDeleteClick(plan)}>
                  Delete
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleUpdateClick(plan)}>
                  Update
                </Button>
                </div>
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

      <Dialog open={updateOpen} onClose={handleClose} maxWidth="md">
        <DialogTitle variant="h4">Payment Plan</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={updateSelectedPlan?.name}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,name: event.target.value})}}
              fullWidth
            />
            <TextField
              label="Description"
              type="text"
              name="description"
              value={updateSelectedPlan?.description}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,description: event.target.value})}}
              fullWidth
            />
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={updateSelectedPlan?.amount}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,amount: event.target.value})}}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ margin: '20px 0' }}>
            <TextField
              label="Likes Limit"
              type="number"
              name="likesLimit"
              value={updateSelectedPlan?.likesLimit}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,likesLimit: event.target.value})}}
              fullWidth
            />
            <TextField
              label="Spins Limit"
              type="number"
              name="spinsLimit"
              value={updateSelectedPlan?.spinsLimit}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,spinsLimit: event.target.value})}}
              fullWidth
            />
            <TextField
              label="Gifts Limit"
              type="number"
              name="giftsLimit"
              value={updateSelectedPlan?.giftsLimit}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,giftsLimit: event.target.value})}}
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
              value={updateSelectedPlan?.transactionId}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,transactionId: event.target.value})}}
              fullWidth
            />
            <TextField
              label="Reset Duration (Hours)"
              type="number"
              name="resetDuration"
              value={updateSelectedPlan?.resetDuration}
              onChange={(event)=>{setUpdateSelectedPlan({...updateSelectedPlan,resetDuration: event.target.value})}}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ marginBottom: '12px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaymentPlans;
