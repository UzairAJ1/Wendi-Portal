import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

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
  Box,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import PaymentForm from './PaymentGateway';
import PremiumFeatures from './PremiumFeatures';
import PaymentPlans from './PaymentPlans';
import UserPage from './PaymentDetailsPage';

const PaymentsFour = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Subscribers List" value="1" />
          <Tab label="Payment Gateway" value="2" />
          <Tab label="Premium feautures" value="3" />
          <Tab label="Payment plans" value="4" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <UserPage />
      </TabPanel>
      <TabPanel value="2">
        <PaymentForm />
      </TabPanel>
      <TabPanel value="3">
        <PremiumFeatures />
      </TabPanel>
      <TabPanel value="4">
        <PaymentPlans />
      </TabPanel>
    </TabContext>
  );
};

export default PaymentsFour;
