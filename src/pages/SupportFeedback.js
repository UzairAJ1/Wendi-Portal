import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Container,
  Button,
  TextField,
  Grid,
  TextareaAutosize,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
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


import Iconify from '../components/iconify';


const FormContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

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

function SupportAndFeedbackScreen() {
  const theme = useTheme();
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
    },
    {
      id: tickets.length + 2,
      title: 'newTicket',
      status: 'Pending',
      user: 'Doe',
      description: 'Issue description',
      priority: 'High',
      supportAgent: '',
    },
    {
      id: tickets.length + 3,
      title: 'newTicket',
      status: 'Completed',
      user: 'Khan Doe',
      description: 'Issue description',
      priority: 'High',
      supportAgent: '',
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
    <FormContainer maxWidth="md" sx={{paddingTop: "0px"}}>
      <Typography variant="h5" gutterBottom>
        Support and Feedback
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
                <Typography variant="h6" gutterBottom style={{ marginTop: '10px' }}>
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

      {/* ... other functionalities ... */}
    </FormContainer>
    <FormContainer maxWidth="md">
    <Typography variant="h5" gutterBottom>
      Reporting and Analytics
    </Typography>
    <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
            
              title= "Metrics:"
              // subheader="(+43%) than last year"
              chartData={[
                { label: 'Response Times', value: (150 / 500) * 100 },
      { label: 'Ticket Resolution Rates', value: (390 / 500) * 100 },
      { label: 'User Satisfaction Ratings', value: (448 / 500) * 100 },
              ]}
              labelStyles={{ fontSize: '26px' }} 
            />
          </Grid>
    <Grid item xs={12} md={6} lg={4}>
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

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>
    </FormContainer>
</>
  );
}

export default SupportAndFeedbackScreen;
