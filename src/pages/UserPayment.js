import React from 'react';
import { Box, Typography, Divider, Paper, Grid, List, ListItem, ListItemText, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const paymentHistory = [
    { date: '2023-08-01', amount: '$50' },
    { date: '2023-07-01', amount: '$50' },
  ];
  const StyledButton = styled(Button)({
    fontSize: '15px',
    marginTop: theme => theme.spacing(2),
  });

  const navigate = useNavigate();
  return (
    <>
     <Container component="main" maxWidth="lg" sx={{ width: '90%' }}>
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payment Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="subtitle1">Username:</Typography>
            <Typography variant="body1">JohnDoe123</Typography>
          </Paper>
          <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="subtitle1">Subscription Status:</Typography>
            <Typography variant="body1" color="primary">
              Active
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="subtitle1">Payment Methods:</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Credit Card" />
              </ListItem>
              <ListItem>
                <ListItemText primary="PayPal" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="subtitle1">Payment History:</Typography>
      <List>
        {paymentHistory.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Date: ${item.date}, Amount: ${item.amount}`} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="subtitle1">Admin Actions:</Typography>
      {/* Add admin actions here */}
    </Paper>
          <StyledButton
          variant="contained"
          color="primary"
          // onClick={() => onUpdatePaymentMethods(['Credit Card', 'PayPal', 'Bitcoin'])}
          onClick={()=>{
              navigate("/userdetails")
              // navigate(-1); 
          }}
          sx={{ margin: "15px 0px 20px 0px", background: '#4A276B' }}
        >
          Back to user details    
        </StyledButton>
        </Container>
        </>
  );
};

export default PaymentDetails;
