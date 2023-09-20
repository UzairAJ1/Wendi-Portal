import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, Button, Container, TextField, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import man from '../assets/man.avif';
import { useGetUserByIdQuery, useSetUserByIdMutation } from '../redux/userManagement/userManagementApi';
import { prepareSetUserDetailsData } from './utils';

const StyledCard = styled(Card)({
  width: '100%', // Set the width to 100% to match the parent Container
  margin: '0 auto',
  padding: (theme) => theme.spacing(2),
});

const StyledButton = styled(Button)({
  fontSize: '15px',
  marginTop: (theme) => theme.spacing(2),
});

const UserDetail = ({ user }) => {
  const [setUserDetails] =  useSetUserByIdMutation()
  const { _id } = useParams();
  console.log("idehhh", _id)
// redux user data
const { data: specificUser, isFetching } = useGetUserByIdQuery({_id});

console.log(specificUser);

  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);



  const dispatch = useDispatch();
  // const [editedUser, setEditedUser] = useState({ ...user });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState({
    fullName: specificUser?.data?.fullName || '',
    gender: specificUser?.data?.gender || '',
    sexualOrientation: specificUser?.data?.sexualOrientation || '',
    email: specificUser?.data?.email || '',
    aboutYou: specificUser?.data?.aboutYou || '',
    password: specificUser?.data?.password || '',
  });
  
  const [userArray, setUserArray] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => {
      // Check if the new value is different from the current value
      if (prevUser[name] !== value) {
        return {
          ...prevUser,
          [name]: value,
        };
      }
      return prevUser; // No change needed
    });
    // console.log("editedUser=====",editedUser)
  };
  

  useEffect(() => {
    const y = 0;
    if(y != 0){
      toast.error('Please enter the credentials', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
    console.log("editedUser=====", editedUser);
  }, [editedUser]);
  

  // const handleSave = async () => {
  //   setUserArray((prevArray) => [...prevArray, editedUser]);
  //   try {
  //     const response = await setUserDetails({ _id, ...editedUser });
  //     console.log('User details updated successfully', response);
  //     setEdit(false);
  //     setEditedUser({
  //       username: '',
  //       gender: '',
  //       sexualOrientation: '',
  //       email: '',
  //       aboutYou: '',
  //       password: '',
  //     });
  //     console.log("editedUser=====", editedUser);
  //   } catch (error) {
  //     console.error('Error updating user details', error);

  //   }
  //   console.log("edited userttt", editedUser)
  //   const res =  setUserDetails(editedUser)
  // };

  const handleSave = async () => {
    if(  fullName === '' || gender === '' || sexualOrientation === '' || email === '' || aboutYou === '' || password === ''){
      toast.error('Please enter the credentials', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
    else{
    try {
      const preparedData = prepareSetUserDetailsData(editedUser, image);
      const response = await setUserDetails({ preparedData, _id });
      console.log("ideeeeeee", _id)
      // const response = await setUserDetails({ payload: editedUser }, _id);

      if (setUserDetails.isSuccess) {
              console.log('User details updated successfully', response);
      setEdit(false);
      setEditedUser({
        fullName: '',
        gender: '',
        sexualOrientation: '',
        email: '',
        aboutYou: '',
        password: '',
      });
        // Successful response handling
        const data = response.data;
        showMessage({
          type: 'success',
          message: 'עודכן בהצלחה',
        });
        // Handle further actions if needed
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  };


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImageError(!selectedImage); // Set imageError to true if no image is selected
  };

  useEffect(() => {
    // Log the updated image state in the useEffect
    console.log("imageee", image);
  }, [image]); // Include 'image' in the dependency array

console.log("editttttt", edit)
  return (
    <Container component="main" maxWidth="lg" sx={{ width: '100%' }}>
      <StyledCard sx={{ width: '95%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, width: '200px', height: '200px' }}>
                <img src={"http://192.168.18.131:3333/Images/" + specificUser?.data?.profileImages[0]?.uri?.split("/")?.pop()} alt="user_image" style={{ width: '180px', height: '170px', objectFit: 'cover' }} />
                {/* <Typography variant="subtitle1">
                  Profile Picture: {editedUser.pic}
                </Typography> */}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Username:</Typography>
                <Typography variant="body1">{specificUser?.data?.fullName}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Gender:</Typography>
                <Typography variant="body1">{specificUser?.data?.gender}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Sexual Orientation:</Typography>
                <Typography variant="body1">{specificUser?.data?.sexualOrientation}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Email:</Typography>
                <Typography variant="body1">{specificUser?.data?.email} </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Bio:</Typography>
                <Typography variant="body1">{specificUser?.data?.aboutYou}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Password:</Typography>
                <Typography variant="body1">dontAsk {editedUser.password}</Typography>
              </Paper>
            </Grid>
          </Grid>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/dashboard/user');
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Back
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              // handleSave();
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
              // handleSave();
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Delete User
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              // handleSave();
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Suspend User
          </StyledButton>

          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/userpayment/${_id}`);
              // navigate('/userpayment');
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
              <TextField label="Username" 
              name = "fullName"
              value={editedUser.fullName || specificUser?.data?.fullName || ''}
              disabled={!edit} 
              fullWidth 
              margin="normal" 
              onChange = {handleInputChange}
              />
              
              <TextField label="Gender" 
              name = "gender"
              value={editedUser.gender || specificUser?.data?.gender || ''}
              // value={specificUser?.data?.gender} 
              disabled={!edit} 
              fullWidth 
              margin="normal"
              onChange = {handleInputChange}
               />

              <TextField
                label="Sexual Orientation"
                name = "sexualOrientation"
                value={editedUser.sexualOrientation || specificUser?.data?.sexualOrientation || ''}
                // value={specificUser?.data?.sexualOrientation}
                disabled={!edit} 
                fullWidth
                margin="normal"
                onChange = {handleInputChange}
              />
              <TextField label="Email" 
              name = "email"
              value={editedUser.email || specificUser?.data?.email || ''}
              // disabled={!edit}
               fullWidth margin="normal"  
                onChange = {handleInputChange}/>
              <TextField label="Bio"
              name = "aboutYou"
               value={editedUser.aboutYou || specificUser?.data?.aboutYou || ''} 
              disabled={!edit} 
              fullWidth margin="normal"   
              onChange = {handleInputChange}/>
              <TextField label="New password" 
              name = "password"
              value = {editedUser.password || specificUser?.data?.password || ''}
              disabled={!edit}
               fullWidth margin="normal"  
                onChange = {handleInputChange}/>
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
                  // handleSave();
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
