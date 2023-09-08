import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchApi } from '../../../redux/slice/ApiCalls';

import { useGetDummyDataQuery } from '../../../redux/slice/ApiCalls';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const { data, error, isLoading } = useGetDummyDataQuery();

  const handleClick = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      rememberMe,
    };

    // dispatch(fetchApi(data))
    
  console.log("data to redux", data)
  };


  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" 
        onChange = {(e)=>{
          setEmail(e.target.value)
        }}
        />

        <TextField
          name="password"
          label="Password"
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
        />
       <Link style={{textDecoration:"none"}} onClick={handleForgotPasswordClick}>Remember me</Link> 
       </div>
        <Link variant="subtitle2" to="" underline="hover" style={{cursor:"pointer"}}>
         <Link onClick={handleForgotPasswordClick}>Forgot password?</Link> 
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" 
     onClick={() => {
      handleClick();
      navigate('/dashboard/home')
    }}
        loading={loading} sx={{background:"#4A276B"}}>
        Login
      </LoadingButton>
    </>
  );
}
