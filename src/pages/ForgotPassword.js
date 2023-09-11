import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '8px',
  justifyContent: 'center',
  minHeight: '100vh',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '8px',
});

const StyledButton = styled(Button)({
  margin: '16px 0',
  backgroundColor: '#4A276B',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#361C4E',
  },
});

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a request to your backend to initiate the reset password process
    // Handle the response and show appropriate messages to the user
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              type="email"
              label="Email address"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <StyledButton type="submit" variant="contained" fullWidth>
              Reset Password
            </StyledButton>
          </Stack>
        </StyledForm>
        <Typography variant="body2" sx={{ marginTop: '20px' }}>
          <Link to="/login">Back to Login</Link>
        </Typography>
      </div>
    </StyledContainer>
  );
}

export default ForgotPassword;
