import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Container, Button, TextareaAutosize, FormControl } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

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

function FeedbackManagement() {
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
    marginTop: (theme) => theme.spacing(2),
  });

  return (
    <>
      <FormContainer maxWidth="md">
        <Typography variant="h5" gutterBottom sx={{ paddingTop: '0px' }}>
          Feedback Management
        </Typography>

        {/* Display the list of tickets */}
        <div>
          {ticketsBackend.map((ticket, index) => (
            <StyledPaper elevation={3}>
              <div key={ticket.id}>
                {/* Additional ticket details */}
                <FormControl fullWidth required margin="normal">
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: '0px' }}>
                    User name:
                  </Typography>

                  <Typography variant="h6" gutterBottom style={{ marginTop: '5px' }}>
                    Feedback: {ticket.feedback}
                  </Typography>
                  <TextareaAutosize
                    aria-label="Message for user"
                    placeholder="Enter your message here"
                    style={{ width: '100%', height: '100px', resize: 'none' }}
                    // rowsMin={3}
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
                    onClick={() => {
                      // navigate("/userdetails")
                    }}
                    sx={{ margin: '15px 0px 20px 0px', background: '#4A276B' }}
                  >
                    Send Message
                  </StyledButton>
                </FormControl>
              </div>
            </StyledPaper>
          ))}
        </div>
        <Button
          variant="contained"
          sx={{ background: '#4A276B', marginTop: '20px', height: '50px', marginRight: '20px', width: '195px' }}
          onClick={() => {
            navigate('/dashboard/supportfour');
            // navigate(-1);
          }}
        >
          Back
        </Button>
        {/* ... other functionalities ... */}
      </FormContainer>
    </>
  );
}

export default FeedbackManagement;
