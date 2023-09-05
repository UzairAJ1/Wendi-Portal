import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

function PaymentForm() {
  const navigate = useNavigate();
  const [name, setName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (input) => {
    const numericInput = input.replace(/\D/g, '');
    const formattedInput = numericInput.replace(/(\d{4})(?=\d)/g, '$1 ');

    return formattedInput;
  };

  const formatExpiryDate = (input) => {
    const numericInput = input.replace(/\D/g, '');
  
    if (numericInput.length === 0) {
      return '';
    }
  
    if (numericInput.length <= 2) {
      return numericInput;
    }
  
    const formattedInput = `${numericInput.slice(0, 2)}/${numericInput.slice(2)}`;
    return formattedInput;
  };
  

  const formatCvv = (input) => {
    const numericInput = input.replace(/\D/g, '');
    const formattedInput = numericInput.slice(0, 3); // Limit to 3 digits

    return formattedInput;
  };

  const handleCardNumberChange = (e) => {
    const formattedInput = formatCardNumber(e.target.value);

    if (formattedInput.length <= 19) {
      setCardNumber(formattedInput);
    }
  };

  // const handleNameChange = (e) => {
  //   setName(e.target.input)
  // }
  // const handleLastNameChange = (e) => {
  //   setLastName(e.target.input)
  // }

  const handleExpiryDateChange = (e) => {
    const formattedInput = formatExpiryDate(e.target.value);

    if (formattedInput.length <= 5) {
      setExpiryDate(formattedInput);
    }
  };

  const handleCvvChange = (e) => {
    const formattedInput = formatCvv(e.target.value);

    setCvv(formattedInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your payment processing logic here
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Payment Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                value={name}
                // onChange={handleNameChange}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/[^A-Za-z]/g, '');
                  setName(sanitizedValue);
                  // handleNameChange(e);
                }}
              />
            </Grid>
              <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/[^A-Za-z]/g, '');
                  setLastName(sanitizedValue);
                  // handleLastNameChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                fullWidth
                variant="outlined"
                value={cardNumber}
                onChange={handleCardNumberChange}
                inputProps={{
                  inputMode: 'numeric',
                  maxLength: 19,
                }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (mm/yy)"
                fullWidth
                variant="outlined"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                inputProps={{
                  inputMode: 'numeric',
                  maxLength: 5,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                fullWidth
                variant="outlined"
                value={cvv}
                onChange={handleCvvChange}
                inputProps={{
                  inputMode: 'numeric',
                  maxLength: 3,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{background:"#4A276B"}}>
                Submit
              </Button>
              <Button variant="contained" sx={{ background: '#4A276B', marginLeft:"20px"}}
          onClick={()=>{
            navigate('/dashboard/payments');
          }} 
          > 
            Back to Payments Menu
          </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default PaymentForm;