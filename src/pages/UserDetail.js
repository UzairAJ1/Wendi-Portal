import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Container, TextField, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import man from '../assets/man.avif'

const StyledCard = styled(Card)({
  width: '100%', // Set the width to 100% to match the parent Container
  margin: '0 auto',
  padding: theme => theme.spacing(2),
});

const StyledButton = styled(Button)({
  fontSize: '15px',
  marginTop: theme => theme.spacing(2),
});

const UserDetail = ({ user }) => {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState({ ...user });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    // Dispatch your Redux action here for updating user details
    // dispatch(updateUserDetails(editedUser));
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageError(!selectedImage); // Set imageError to true if no image is selected
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ width: '100%' }}>
      <StyledCard sx={{ width: '95%' }}>
        <CardContent>
          
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, width:"200px", height:"200px" }}>
              <img src={man} alt="user_image" style={{width:"180px", height:"170px", objectFit:"cover"}}/>
                {/* <Typography variant="subtitle1">
                  Profile Picture: {editedUser.pic}
                </Typography> */}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "2px" }}>
                <Typography variant="subtitle1">
                  Username: 
               
                </Typography>
                <Typography variant="body1">
               {editedUser.username} John
                  </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "2px" }}>
                <Typography variant="subtitle1">
                  Gender: 
                </Typography>
                <Typography variant="body1">
                {editedUser.gender} Male
                  </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "2px" }}>
                <Typography variant="subtitle1">
                  Sexual Orientation: 
                </Typography>
                <Typography variant="body1">
                {editedUser.sex_orientation} Straight
                  </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "2px" }}>
                <Typography variant="subtitle1">
                  Email: 
                </Typography>
                <Typography variant="body1">
                {editedUser.email} johndoe@gmail.com
                  </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "2px" }}>
                <Typography variant="subtitle1">
                  Bio: 
                </Typography>
                <Typography variant="body1">
                  Software Engineer {editedUser.bio}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, display:"flex", gap: "2px" }}>
                <Typography variant="subtitle1">
                  Password: 
                </Typography>
                <Typography variant="body1">
                  dontAsk {editedUser.password}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <StyledButton
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/dashboard/user");
                }}
                sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
              >
                Back
              </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave();
              setEdit(true);
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Edit
          </StyledButton>

          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave();
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Delete User
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave();
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Suspend User
          </StyledButton>

          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/userpayment");
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Payment Details
          </StyledButton>

        </CardContent>
      </StyledCard>
      {edit && (
        <Container component="main" maxWidth="lg" sx={{ width: '100%', marginTop: '50px' }}>
          <StyledCard sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Edit Details
              </Typography>
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
                label="Username"
                value={editedUser.username}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                value={editedUser.gender}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Sexual Orientation"
                value={editedUser.sexual_orientation}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={editedUser.email}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Bio"
                value={editedUser.bio}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New password"
                value={editedUser.password}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSave();
                  setEdit(false);
                }}
                sx={{ margin: '10px 10px 0px 0px', background: '#4A276B' }}
              >
                Save Changes
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSave();
                  setEdit(false);
                }}
                sx={{ margin: '10px 10px 0px 0px', background: '#4A276B' }}
              >
                Cancel
              </StyledButton>
            </CardContent>
          </StyledCard>
        </Container>
      )}
    </Container>
  );
};

export default UserDetail;
