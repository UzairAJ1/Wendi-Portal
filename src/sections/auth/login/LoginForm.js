import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchApi } from '../../../redux/slice/ApiCalls';
import { setUser } from '../../../redux/slices/auth';
import { useGetDummyDataQuery, useLoginMutation } from '../../../redux/toolkitQuery/ApiCalls';
import Iconify from '../../../components/iconify';


export default function LoginForm() {
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
 const [loginApi] =  useLoginMutation()
 const {userData} = useSelector(state=>state.auth)
console.log("USER DATA =======",userData)
  // const { data, error, isLoading, isFetching, isSuccess } = useGetDummyDataQuery();

  const HandleClick = async (e) => {
    // e.preventDefault();
    const data = {
      email,
      password,
    };

    const res = await loginApi(data)
    console.log("RESPONSE =====",res) 

    // if(res?.error){
    //   alert("no access");
    // }

    // else if (res?.data?.status == 200){
    //   dispatch(setUser({
    //     _id: res?.data?.data?._id,
    //     userType:res?.data?.data?.userType,
    //     email: res?.data?.data?.email,
    //   }))
    //   navigate('/dashboard/home');
    // } 
  console.log("data to redux", data)
  
  navigate('/dashboard/home');
};


  const handleForgotPasswordClick = () => {
    navigate('/forgotpassword');
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email" 
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
      HandleClick();
      // navigate('/dashboard/home')
    }}
        loading={loading} sx={{background:"#4A276B"}}>
        Login
      </LoadingButton>
    </>
  );
}
