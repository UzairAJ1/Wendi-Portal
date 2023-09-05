import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
  } from '@mui/material';

const PaymentsFour = () => {
    const navigate = useNavigate();
  return (
    <>
    <div style={{display:"flex", justifyContent:"flex-start" , alignItems:"flex-start", flexDirection:"column", marginLeft:"50px", gap:"25px"}}>
    <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
          onClick={()=>{
            navigate('/subscribers');
          }}
          > 
            Subscribers List
          </Button>
    <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
          onClick={()=>{
            navigate('/paymentgateway');
          }} 
          > 
            Payment Gateway
          </Button>
          <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
          onClick={()=>{
            navigate('/premiumfeatures');
          }} 
          > 
            Premium feautures
          </Button>
          <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
          onClick={()=>{
            navigate('/paymentplans');
          }} 
          > 
            Payment plans
          </Button>
    </div>
    </>
  )
}

export default PaymentsFour