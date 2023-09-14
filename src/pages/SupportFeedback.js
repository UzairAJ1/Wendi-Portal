import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
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
</>
  );
}

export default SupportAndFeedbackScreen;
