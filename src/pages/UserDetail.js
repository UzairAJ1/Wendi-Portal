import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';

import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  TextField,
  Grid,
  Paper,
  Box,
  Avatar,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import man from '../assets/man.avif';
import {
  useGetUserByIdQuery,
  useSetUserByIdMutation,
  useDeleteUserByIdMutation,
  useSetStatusByidMutation,

} from '../redux/userManagement/userManagementApi';
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
  const [setUserStatus] = useSetStatusByidMutation();
  const [setUserDetails] = useSetUserByIdMutation();
  const { _id } = useParams();
  const {
    data: specificUser,
    isFetching,
    refetch,
  } = useGetUserByIdQuery(
    { _id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deleteUser] = useDeleteUserByIdMutation();
  const [image, setImage] = useState(null);
  // const [imageURI, setImageURI] = useState('');
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  // const [editedUser, setEditedUser] = useState({ ...user });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState({
    fullName: '',
    gender: '',
    sexualOrientation: '',
    // email: specificUser?.data?.email || '',
    aboutYou: '',
    status: '',
    lookingFor: [],
    wantToSee: '',
    // password: specificUser?.data?.password || '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // if (editedUser.fullName || editedUser.gender || editedUser.sexualOrientation || editedUser.aboutYou) {
    //   <ColorRing
    //     visible={true}
    //     height="80"
    //     width="80"
    //     ariaLabel="blocks-loading"
    //     wrapperStyle={{}}
    //     wrapperClass="blocks-wrapper"
    //     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    //   />;
    // } elseU

    setEditedUser({
      fullName: specificUser?.data?.fullName,
      gender: specificUser?.data?.gender,
      sexualOrientation: specificUser?.data?.sexualOrientation,
      // email: specificUser?.data?.email,
      aboutYou: specificUser?.data?.aboutYou,
      status: specificUser?.data?.status,
      lookingFor: specificUser?.data?.lookingFor,
      wantToSee: specificUser?.data?.wantToSee,
      // password: specificUser?.data?.password,
    });
  }, [specificUser]);
 
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
      return prevUser;
    });
  };
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

  // const handleSave = async () => {
  //   if (
  //     editedUser.fullName === '' ||
  //     editedUser.gender === '' ||
  //     editedUser.sexualOrientation === '' ||
  //     editedUser.aboutYou === '' ||
  //     editedUser.status === '' ||
  //     editedUser.lookingFor === '' ||
  //     editedUser.wantToSee === ''
  //   ) {
  //     toast.error('Please enter the credentials', {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 3000,
  //     });
  //   } else {
  //     try {
  //       setLoading(true);
  //       const preparedData = prepareSetUserDetailsData(editedUser, selectedImage);

  //       const response = await setUserDetails({ preparedData, _id });

  //       if (response?.data?.status === 200) {
  //         refetch();
  //         // setImageURI(response.data.uri);
  //         setLoading(false);
  //       }

  //       // const response = await setUserDetails({ payload: editedUser }, _id);
  //       setEdit(false);
  //       if (setUserDetails.isSuccess) {
  //         toast.success('User details updated successfully');
  //         console.log('User details updated successfully', response);

  //         setEditedUser({
  //           fullName: '',
  //           gender: '',
  //           sexualOrientation: '',
  //           // email: '',
  //           aboutYou: '',
  //           wantToSee: '',
  //           lookingFor: '',
  //           // password: '',
  //         });
  //         // Successful response handling

  //         // Fahad commented
  //         // const data = response.data;
  //         // showMessage({
  //         //   type: 'success',
  //         //   message: 'עודכן בהצלחה',
  //         // });
  //         //

  //         // Handle further actions if needed
  //       }
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   }
  // };
  const handleSave = async () => {
    try {
      setLoading(true);

      const isUserDataValid =
        editedUser.fullName &&
        editedUser.gender &&
        editedUser.sexualOrientation &&
        editedUser.aboutYou &&
        editedUser.status &&
        editedUser.lookingFor &&
        editedUser.wantToSee;

      if (!isUserDataValid) {
        toast.error('Please enter all the required credentials', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else {
        const preparedData = prepareSetUserDetailsData(editedUser, selectedImage);
        const response = await setUserDetails({ preparedData, _id });

        if (response?.data?.status === 200) {
          refetch();
          toast.success('User details updated successfully');
          setEditedUser({
            fullName: '',
            gender: '',
            sexualOrientation: '',
            aboutYou: '',
            wantToSee: '',
            lookingFor: [],
          });
          setEdit(false);
        } else {
          toast.error('Failed to update user details');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating user details');
    } finally {
      setLoading(false);
    }
  };



  const handleDelete = (userId) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      deleteUser(userId);
      navigate('/dashboard/user');
      toast.success('User has been Deleted');
    }
  };
  const handleSuspend = async () => {
    try {
      await setUserStatus({
        status: 'banned',
        userId: _id,
      });
      toast.success('User has been Successfully Banned');
      await refetch(); // Wait for the refetch to complete
    } catch (error) {
      console.error('Error while suspending the user:', error);
    }
  };

  const handleUnSuspend = async () => {
    console.log("ID =====", _id)

    try {
      const response = await setUserStatus({
        status: 'active',
        userId: _id,
      });

      console.log('RESPONSE ======== ', response);
      toast.success('User has been Successfully UnBanned');
      await refetch(); // Wait for the refetch to complete
    } catch (error) {
      console.error('Error while unsuspending the user:', error);
    }
  };

  const handleBack = () => {
    navigate('/dashboard/user');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // You can also add validation here for the file type and size if needed
      const imageURL = URL.createObjectURL(file);
      setSelectedImageURL(imageURL);
      setSelectedImage(file);
    }
  };

  const myImg = `${process.env.REACT_APP_API_URL}Images/${specificUser?.data?.profileImages
    ?.find((item) => item?.orderId === 1)
    ?.uri?.split('/')
    ?.pop()}`;
  
  const transformGenderForDisplay = (value) => {
    if (value === 'male') {
      return 'Male';
    }
    if (value === 'female') {
      return 'Female';
    }
    return value;
  };
  if (isFetching) {
    return <div>Loading...</div>;
  }
  
  const handleCheckboxChange = (value) => {
    setEditedUser((prevUser) => {
      // Clone the existing array to avoid modifying it directly
      const updatedLookingFor = [...prevUser.lookingFor];
  console.log("updatedLookingFor",updatedLookingFor);
      // Check if the value is already in the array
      const index = updatedLookingFor.indexOf(value);
  
      if (index !== -1) {
        // If it's already in the array, remove it
        updatedLookingFor.splice(index, 1);
      } else {
        // If it's not in the array, add it
        updatedLookingFor.push(value);
      }
  
      return {
        ...prevUser,
        lookingFor: updatedLookingFor,
      };
    });
  };
  console.log("True User:",editedUser);
  return loading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '100vh', // Adjust the height as needed
      }}
    >
      <TailSpin color="blue" radius={'8px'} sx={{ width: '100%' }} />
    </div>
  ) : (
    <Container component="main" maxWidth="lg" sx={{ width: '100%' }}>
      <StyledCard sx={{ width: '95%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, width: '200px', height: '200px' }}>
                <img alt="" src={myImg} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                {/* <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} /> */}
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

            {/* <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Email:</Typography>
                <Typography variant="body1">{specificUser?.data?.email} </Typography>
              </Paper>
            </Grid> */}
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Bio:</Typography>
                <Typography variant="body1">{specificUser?.data?.aboutYou}</Typography>
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Password:</Typography>
                <Typography variant="body1">dontAsk {editedUser.password}</Typography>
              </Paper>
            </Grid> */}
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
            User Preference
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Sexual Orientation:</Typography>
                <Typography variant="body1">{specificUser?.data?.sexualOrientation}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Wants to see:</Typography>
                <Typography variant="body1">{specificUser?.data?.wantToSee}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={3} sx={{ padding: 2, display: 'flex', gap: '2px' }}>
                <Typography variant="subtitle1">Looking For:</Typography>
                <Typography variant="body1">{specificUser?.data?.lookingFor}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <StyledButton
            variant="contained"
            color="primary"
            // onClick={() => {
            //   handleBack();
            // }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
            onClick={handleBack}
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
              handleDelete(_id);
            }}
            sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
          >
            Delete User
          </StyledButton>

          {specificUser?.data?.status === 'active' && (
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => {
                handleSuspend();
              }}
              sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
            >
              Ban User
            </StyledButton>
          )}

          {specificUser?.data?.status === 'banned' && (
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => {
                handleUnSuspend();
              }}
              sx={{ margin: '20px 10px 0px 0px', background: '#4A276B' }}
            >
              UnBan User
            </StyledButton>
          )}

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
              {/* <div>
                <img alt="" src="sdf" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
              </div> */}

              {selectedImageURL && (
                <div>
                  <img
                    alt="Selected"
                    src={selectedImageURL}
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
              <TextField
                label="Username"
                name="fullName"
                value={editedUser.fullName}
                disabled={!edit}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              />

              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={transformGenderForDisplay(editedUser.gender)}
                // value={specificUser?.data?.gender}

                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>

              {/* <TextField label="Email" 
              name = "email"
              value={editedUser.email}
              // disabled={!edit}
               fullWidth margin="normal"  
                onChange = {handleInputChange}/> */}
              <TextField
                label="Bio"
                name="aboutYou"
                value={editedUser.aboutYou}
                disabled={!edit}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              />
              {/* 
              <TextField
                label="Sexual Orientation"
                name="sexualOrientation"
                value={editedUser.sexualOrientation}
                // value={specificUser?.data?.sexualOrientation}
                disabled={!edit}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              /> */}
              <InputLabel>Sexual Orientation</InputLabel>
              <Select
                label="Sexual Orientation"
                name="sexualOrientation"
                value={editedUser?.sexualOrientation}
                margin='normal'
                // value={specificUser?.data?.gender}
                onChange={handleInputChange}
                fullWidth
              >
                <MenuItem value="סטרייט">סטרייט</MenuItem>
                <MenuItem value="הומוסקסואל">הומוסקסואל</MenuItem>
                <MenuItem value="ביוסקסואל">ביוסקסואל</MenuItem>
                <MenuItem value="לסבית">לסבית</MenuItem>
              </Select>

              {/* <TextField
                label="Wants to see"
                name="wantToSee"
                value={editedUser.wantToSee}
                // value={specificUser?.data?.sexualOrientation}
                disabled={!edit}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              /> */}

              <InputLabel>Wants to see</InputLabel>
              <Select
                label="Wants to see"
                name="wantToSee"
                value={editedUser?.wantToSee}
                // value={specificUser?.data?.gender}
                onChange={handleInputChange}
                margin='normal'
                fullWidth
              >
                <MenuItem value="גברים">גברים</MenuItem>
                <MenuItem value="נשים">נשים</MenuItem>
                <MenuItem value="גם וגם">גם וגם</MenuItem>
              </Select>



              {/* <TextField
                label="Looking For"
                name="lookingFor"
                value={editedUser.lookingFor}
                // value={specificUser?.data?.sexualOrientation}
                disabled={!edit}
                fullWidth
                margin="normal"
                onChange={handleInputChange}
              /> */}

              {/* <InputLabel>Looking For</InputLabel>
              <Select
                label="Looking For"
                name="lookingFor"
                value={editedUser?.lookingFor}
                // value={specificUser?.data?.gender}
                onChange={handleInputChange}
                margin='dense'
                fullWidth

              >
                <MenuItem value="דייטינג">דייטינג</MenuItem>
                <MenuItem value="קשר לטווח קצר">קשר לטווח קצר</MenuItem>
                <MenuItem value="שיחות">שיחות</MenuItem>
                <MenuItem value="קשר לטווח ארוך">קשר לטווח ארוך</MenuItem>
              </Select> */}
<Typography>
Looking For
  </Typography>
<div   style={{
        display: 'flex',
         // Center vertically
         alignItems: 'center',
         marginTop:'10px',
        height: '40px', // Adjust the height as needed
      }} >
<Typography>
דייטינג
  </Typography>
    <Checkbox 
    checked={editedUser.lookingFor.includes('דייטינג')}
      onChange={() => handleCheckboxChange('דייטינג')}/>

<Typography>
קשר לטווח קצר
  </Typography>
    <Checkbox 
    checked={editedUser.lookingFor.includes('קשר לטווח קצר')}
      onChange={() => handleCheckboxChange('קשר לטווח קצר')}/>

<Typography>
שיחות
  </Typography>
    <Checkbox 
    checked={editedUser.lookingFor.includes('שיחות')}
      onChange={() => handleCheckboxChange('שיחות')}/>

<Typography>
קשר לטווח ארוך
  </Typography>
    <Checkbox 
    checked={editedUser.lookingFor.includes('קשר לטווח ארוך')}
      onChange={() => handleCheckboxChange('קשר לטווח ארוך')}/>
    
 
</div>





              {/* <TextField label="New password" 
              name = "password"
              value = {editedUser.password}
              disabled={!edit}
               fullWidth margin="normal"  
                onChange = {handleInputChange}/> */}
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSave();
                  // setEdit(false);
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
