import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSuccess } from '../SuccessContext';

function NewUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { showSuccess, setShowSuccess } = useSuccess();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    // Email validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setEmailError(!isValid);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleVerifiedChange = (event) => {
    setVerified(event.target.checked);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageError(!selectedImage); // Set imageError to true if no image is selected
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailError && image) {
      navigate('/dashboard/user');
      setShowSuccess(true);
      console.log("gfdtrhsdjj", showSuccess)
    } else if (!image) {
      toast.error('Please select an image');
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography variant="h4" gutterBottom>
        New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Button variant="outlined" component="label" htmlFor="image-input">
          Upload Image
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Button>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={handleFirstNameChange}
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={handleLastNameChange}
          required
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          required
          error={emailError}
          helperText={emailError ? 'Please enter a valid email address' : ''}
          margin="normal"
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={handleRoleChange}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <FormGroup row>
          <FormControlLabel control={<Switch checked={verified} onChange={handleVerifiedChange} />} label="Verified" />
        </FormGroup>
        <FormControl fullWidth required margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Banned</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#4A276B', marginTop: '16px' }}
        >
          Add New User
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#4A276B', marginTop: '16px' }}
          onClick = {()=>{
            navigate("/dashboard/user")
          }}
        >
          Cancel
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default NewUser;
