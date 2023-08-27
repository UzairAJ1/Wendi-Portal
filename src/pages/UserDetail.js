import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)({
  width: '100%', // Set the width to 100% to match the parent Container
  margin: '0 auto',
  padding: theme => theme.spacing(2),
});

const StyledButton = styled(Button)({
  marginTop: theme => theme.spacing(2),
});

const UserDetail = ({ user }) => {
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState({ ...user });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate(); 
  const handleSave = () => {
    // Dispatch your Redux action here for updating user details
    // dispatch(updateUserDetails(editedUser));
  };

  return (
    <Container component="main" maxWidth="100%" sx={{ width: '90%' }}>
      <StyledCard sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1">
            Username: {editedUser.username}
          </Typography>
          <Typography variant="body1">
            Gender: {editedUser.gender}
          </Typography>
          <Typography variant="body1">
            Sexual Orientation: {editedUser.gender}
          </Typography>
          <Typography variant="body1">
            Email: {editedUser.gender}
          </Typography>
          <Typography variant="body1">
            Profile Picture: {editedUser.gender}
          </Typography>
          <Typography variant="body1">
            {editedUser.gender}
          </Typography>
          <Typography variant="body1">
            Bio: {editedUser.gender}
          </Typography>
          {/* Display other fields like sexual orientation, email, etc. */}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave();
              setEdit(true);
            }}
            sx={{ margin: "10px 10px 0px 0px", background: '#4A276B'  }}
          >
            Edit
          </StyledButton>

          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave();
            }}
            sx={{ margin: "10px 10px 0px 0px", background: '#4A276B'  }}
          >
            Delete User
          </StyledButton>

          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              // handleSave();
              // setEdit(true);
              navigate("/userpayment")
            }}
            sx={{ margin: "10px 10px 0px 0px", background: '#4A276B'  }}
          >
            Payment Details
          </StyledButton>
        </CardContent>
        
      </StyledCard>
      <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              handleSave();
              navigate('/dashboard/user');
            }}
            sx={{ margin: "10px 10px 0px 0px", background: '#4A276B'  }}
          >
            Back to users list
          </StyledButton>

      {edit && (
        <Container component="main" maxWidth="100%" sx={{ width: '100%', marginTop:"50px" }}>
          <StyledCard sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Details
              </Typography>
              {/* <Button>okk</Button> */}
              <TextField
                label="Username"
                value={editedUser.username}
                // onChange={e => handleInputChange('username', e.target.value)}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                value={editedUser.gender}
                // onChange={e => handleInputChange('gender', e.target.value)}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
                            <TextField
                label="Sexual Orientation"
                value={editedUser.sexual_orientation}
                // onChange={e => handleInputChange('gender', e.target.value)}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
                            <TextField
                label="Gender"
                value={editedUser.gender}
                // onChange={e => handleInputChange('gender', e.target.value)}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
                            <TextField
                label="Profile Picture"
                value={editedUser.profile_pic}
                // onChange={e => handleInputChange('gender', e.target.value)}
                disabled={!edit}
                fullWidth
                margin="normal"
              />
                            <TextField
                label="Bio"
                value={editedUser.bio}
                // onChange={e => handleInputChange('gender', e.target.value)}
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
                sx={{ margin: "10px 10px 0px 0px", background: '#4A276B'  }}
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
                sx={{ margin: "10px 10px 0px 0px", background: '#4A276B'  }}
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
