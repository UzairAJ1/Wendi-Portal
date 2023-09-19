import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchApi } from '../../../redux/slice/ApiCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../../../redux/slices/auth';
import { setRemember } from '../../../redux/slices/rememberMeSlice';
import { useGetDummyDataQuery, useLoginMutation } from '../../../redux/toolkitQuery/ApiCalls';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
 const [loginApi] =  useLoginMutation()
 const {userData} = useSelector(state=>state.auth)
 const {remember} = useSelector(state=>state.remember)

console.log("USER DATA =======",userData)
  // const { data, error, isLoading, isFetching, isSuccess } = useGetDummyDataQuery();
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    // if(!rememberMe){
      const newEmail = e.target.value;
      setEmail(newEmail);
      // Regular expression for email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      setIsValid(emailPattern.test(newEmail));
    // }
  };


  const HandleClick = async (e) => {

    if (rememberMe) {
      // If "Remember Me" is checked, store credentials in cookies
      Cookies.set('email', email, { expires: 7 }); // Expires in 7 days
      Cookies.set('password', password, { expires: 7 });
    }
    else {
      // If "Remember Me" is unchecked, remove the cookies
      Cookies.remove('email');
      Cookies.remove('password');
    }
    // e.preventDefault();
    const data = {
      email,
      password,
    };

    if(email === "" || password === ""){
      toast.error('Please enter the credentials', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      setLoading(false)
    }
  
    else {
      setLoading(true);
    const res = await loginApi(data)
    console.log("RESPONSE =====",res)
     if(res?.error){
      toast.error('No access', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      setLoading(false)
      // alert("no access");
    }

    else if (res?.data?.status === 200){
      dispatch(setUser({
        _id: res?.data?.data?._id,
        userType:res?.data?.data?.userType,
        email: res?.data?.data?.email,
      }))
      setLoading(false)
      // navigate('/dashboard/home');
    } 
  console.log("data to redux", data)
  
  // navigate('/dashboard/home');


};
  }
  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };

  useEffect(() => {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
  console.log("savedmailll", savedEmail)
    if (savedEmail && savedPassword) {
      // If credentials are found, pre-fill the input fields
      setEmail(savedEmail);
      setPassword(savedPassword);
      // setRememberMe(true);
    }
  }, []);
  
  

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email" 
        onChange = {(e)=>{
          handleEmailChange(e);
          // setEmail(e.target.value)
        }}
        value={email}
        error={!isValid}
        helperText={!isValid ? 'Invalid email address' : ''}
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange = {(e)=>{
     
              setPassword(e.target.value)
              // console.log("Data approaching", e.target.innerText)
            
          }}
       
       />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <div>
        <Checkbox name="remember" label="Remember me"  
        onChange = {(e)=>{
          setRememberMe(e.target.checked)
        }}
        defaultChecked={true}
        />
       <Link style={{textDecoration:"none"}}
        onClick={() => {
          dispatch(setRemember(true));
          console.log("remember===========", remember);
        }}>
          Remember me</Link> 
       </div>
        <Link variant="subtitle2" to="" underline="hover" style={{cursor:"pointer"}}>
         <Link onClick={()=>{handleForgotPasswordClick()
        
        }}>Forgot password?</Link> 
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" 
     onClick={() => {
      HandleClick();
     
      // navigate('/dashboard/home')
    }}
        loading={loading} sx={{background:"#4A276B"}}
        disabled={loading}
        >
        Login
      </LoadingButton>
    </>
  );
}