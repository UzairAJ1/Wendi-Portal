import {React, useState, useEffect} from 'react';
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
  Grid,
  Box,
  TextareaAutosize,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';



const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));


// supportfdbck

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  marginTop: '30px',
}));

const useStyles = {
  submitButton: {
    marginTop: 3,
  },
};

const Supportfour = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

// supportfeedback
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState('');

  const [supportAgent, setSupportagent] = useState([]);
  const [message, setMessage] = useState([]);

  const [ticketsBackend, setTicketsBackend] = useState([
    {
      id: tickets.length + 1,
      title: 'newTicket',
      status: 'Open',
      user: 'John Doe',
      description: 'Issue description',
      priority: 'High',
      supportAgent: '',
      agent: 'Agent 1',
    },
    {
      id: tickets.length + 2,
      title: 'newTicket',
      status: 'Pending',
      user: 'Doe',
      description: 'Issue description',
      priority: 'High',
      supportAgent: '',
      agent: 'Agent 3',
    },
    {
      id: tickets.length + 3,
      title: 'newTicket',
      status: 'Completed',
      user: 'Khan Doe',
      description: 'Issue description',
      priority: 'High',
      supportAgent: '',
      agent: 'none',
    },
  ]);
  const StyledButton = styled(Button)({
    marginTop: theme => theme.spacing(2),
  });
  useEffect(() => {
    // Fetch tickets from the backend here
    // fetchTicketsFromBackend()
    //   .then((fetchedTickets) => {
    //     setTickets(fetchedTickets);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching tickets:', error);
    //   });
  }, []);

  // const fetchTicketsFromBackend = async () => {
  //   try {
  //     // Perform a fetch request to your backend API
  //     const response = await fetch('/api/tickets'); // Adjust the URL as needed
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };


  
  return (
    <>
    <Box sx={{ width: '100%', typography: 'body1' }}>
<TabContext value={value}>
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Reporting and Analytics" value="1" />
            <Tab label="Ticket Management" value="2" />
            <Tab label="Feedback Management" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginLeft: '50px',
          gap: '25px',
        }}
      >
        
        {/* <div style={{ display: 'flex' }}>
          <Button
            variant="contained"
            sx={{ background: '#4A276B', height: '50px', marginRight: '20px', width: '195px' }}
            onClick={() => {
              navigate('/supportandfeedback');
            }}
          >
            Ticket Management
          </Button>
          <Button
            variant="contained"
            sx={{ background: '#4A276B', height: '50px', marginRight: '20px', width: '195px' }}
            onClick={() => {
              navigate('/feedbackmanagement');
            }}
          >
            Feedback Management
          </Button>
        </div> */}
        {/* <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"170px"}}
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
          </Button> */}
        <FormContainer maxWidth="md">
          <Typography variant="h5" gutterBottom>
            Reporting and Analytics
          </Typography>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Metrics:"
              // subheader="(+43%) than last year"
              labelStyles={{ fontSize: '32px' }}
              chartData={[
                { label: 'Response Times', value: (150 / 500) * 100 },
                { label: 'Ticket Resolution Rates', value: (390 / 500) * 100 },
                { label: 'User Satisfaction Ratings', value: (448 / 500) * 100 },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ marginY: '20px' }}>
            <AppCurrentSubject
              title="Different trends"
              chartLabels={['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']}
              chartData={[
                { name: 'Male', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Female', data: [20, 30, 40, 80, 20, 80] },
                // { name: 'Feature 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
        </FormContainer>
      </div>
      </TabPanel>


      <TabPanel value="2">
      <FormContainer maxWidth="md" >
      <Typography variant="h5" gutterBottom sx={{paddingTop: "0px"}}>
        Ticket Management
      </Typography>

      {/* Display the list of tickets */}
      <div>
        {ticketsBackend.map((ticket, index) => (
          <StyledPaper elevation={3}>
            <div key={ticket.id} style={{ marginTop: '20px' }}>
              <strong>Ticket #{ticket.id}</strong> - {ticket.title}
              <br />
              User: {ticket.user}
              <br />
              Issue Description: {ticket.description}
              <br />
              Priority: {ticket.priority}
              <br />
              Agent assignedbgg: {ticket.agent} 
              <br />
              {/* Status: {ticket.status} */}
              {/* Additional ticket details */}
              <FormControl fullWidth required margin="normal">
                <InputLabel>Agent</InputLabel>
                <Select
                  value={supportAgent[index]}
                  onChange={(event) => {
                    const newSupportAgents = [...supportAgent];
                    newSupportAgents[index] = event.target.value;
                    setSupportagent(newSupportAgents);
                  }}
                >
                  <MenuItem value="agentOne">Agent 1</MenuItem>
                  <MenuItem value="agentTwo">Agent 2</MenuItem>
                  <MenuItem value="agentThree">Agent 3</MenuItem>
                </Select>
                <StyledButton
            variant="contained"
            color="primary"
            // onClick={() => onUpdatePaymentMethods(['Credit Card', 'PayPal', 'Bitcoin'])}
            onClick={()=>{
                // navigate("/userdetails")
            }}
            sx={{ margin: "15px 0px 20px 0px", background: '#4A276B' }}
          >
            Assign Agent
          </StyledButton>
                <Typography variant="h6" gutterBottom style={{ marginTop: '10px' }}>
                  Status: {ticket.status}
                </Typography>
              </FormControl>
            </div>
          </StyledPaper>
        ))}
      </div>
      <Button variant="contained" sx={{ background: '#4A276B',  height: "50px", marginRight:"20px", width:"195px", marginTop:"20px"}}
          onClick={()=>{
            navigate('/dashboard/supportfour'); 
          }}
          > 
            Back 
          </Button>
     
    </FormContainer>
    </TabPanel>

    <TabPanel value="3">
    <FormContainer maxWidth="md" >
      <Typography variant="h5" gutterBottom sx={{paddingTop: "0px"}}>
        Feedback Management
      </Typography>

      {/* Display the list of tickets */}
      <div>
        {ticketsBackend.map((ticket, index) => (
          <StyledPaper elevation={3}>
            <div key={ticket.id}>

              {/* Additional ticket details */}
              <FormControl fullWidth required margin="normal">
              <Typography variant="h6" gutterBottom sx={{paddingTop: "0px"}}>
        User name:
      </Typography>
           
                <Typography variant="h6" gutterBottom style={{ marginTop: '5px' }}>
                  Feedback: {ticket.feedback}
                </Typography>
                <TextareaAutosize
      aria-label="Message for user"
      placeholder="Enter your message here"
      style={{ width: '100%', height: '100px', resize: 'none'  }} 
      rowsMin={3}  
      required
      margin="normal"
      onChange={(event) => {
        const newMessage = [...message];
        newMessage[index] = event.target.value;
        setMessage(newMessage);
      }}
        />
              <StyledButton
            variant="contained"
            color="primary"
            // onClick={() => onUpdatePaymentMethods(['Credit Card', 'PayPal', 'Bitcoin'])}
            onClick={()=>{
                // navigate("/userdetails")
            }}
            sx={{ margin: "15px 0px 20px 0px", background: '#4A276B' }}
          >
            Send Message
          </StyledButton>
              </FormControl>
            </div>
          </StyledPaper>
        ))}
      </div>
      <Button variant="contained" sx={{ background: '#4A276B', marginTop:"20px", height: "50px", marginRight:"20px", width:"195px"}}
          onClick={()=>{
            navigate('/dashboard/supportfour'); 
            // navigate(-1); 
          }}
          > 
            Back
          </Button>
      {/* ... other functionalities ... */}
    </FormContainer>
    </TabPanel>
      </TabContext>
      </Box>



    </>
  );
};

export default Supportfour;
