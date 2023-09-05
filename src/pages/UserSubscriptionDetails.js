import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,

  Paper,
  TextField,
  Grid,
  TextareaAutosize,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const CenteredContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'white',
  width: '70%',
  margin: '0 auto',
  
});
const StyledButton = styled(Button)({
    marginTop: theme => theme.spacing(2),
  });
const StyledCard = styled(Card)({
  width: '100%', // Set the width to 100% to match the parent Container
  margin: '0 auto',
  padding: theme => theme.spacing(2),
});

const UserSubscriptionDetails = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('Active');
  const [paymentMethods, setPaymentMethods] = useState(['Credit Card', 'PayPal']);
  const [paymentHistory, setPaymentHistory] = useState([
    { date: '2023-08-01', amount: '$50' },
    { date: '2023-07-01', amount: '$50' },
    // ... more payment history entries
  ]);

  const handleUpdateSubscription = (status) => {
    setSubscriptionStatus(status);
  };

  const handleUpdatePaymentMethods = (methods) => {
    setPaymentMethods(methods);
  };
  const navigate = useNavigate(); 
  return (
    <Container component="main" maxWidth="100%" sx={{ width: '90%' }}>
      <StyledCard sx={{ width: "100%" }}>
      <Card>
      
        <CardContent>

        <Typography variant="h4" sx={{}}>
              User Subscription Details
            </Typography> 
        <Typography variant="h5">
        Username: John
            {/* Username: {editedUser.username} */}
          </Typography>
          <PaymentPanel
            subscriptionStatus={subscriptionStatus}
            paymentMethods={paymentMethods}
            paymentHistory={paymentHistory}
            onUpdateSubscription={handleUpdateSubscription}
            onUpdatePaymentMethods={handleUpdatePaymentMethods}
          />
        </CardContent>
      </Card>
      <StyledButton
            variant="contained"
            color="primary"
            // onClick={() => onUpdatePaymentMethods(['Credit Card', 'PayPal', 'Bitcoin'])}
            onClick={()=>{
                navigate("/subscribers")
            }}
            sx={{ margin: "15px 0px 20px 0px", background: '#4A276B' }}
          >
            Back to subscribers    
          </StyledButton>
    {/* </CenteredContainer> */}

    </StyledCard>
      </Container> 
  );
};

const PaymentPanel = ({ subscriptionStatus, paymentMethods, paymentHistory, onUpdateSubscription, onUpdatePaymentMethods }) => {
  return (
    <div>
      <SubscriptionStatus status={subscriptionStatus} onUpdateSubscription={onUpdateSubscription} />
      <PaymentMethods paymentMethods={paymentMethods} onUpdatePaymentMethods={onUpdatePaymentMethods} />
      <PaymentHistory history={paymentHistory} />
      <AdminActions />
    </div>
  );
};

const SubscriptionStatus = ({ status, onUpdateSubscription }) => {
  return (
    <div>
      <Typography variant="h5">Subscription Status: Active</Typography>
      {/* <Typography>Status: {status}</Typography> */}
      <StyledButton
            variant="contained"
            color="primary"
            onClick={() => onUpdateSubscription('Active')}
            sx={{ margin: "5px 10px 10px 0px", background: '#4A276B' }}
          >
          Activate
          </StyledButton>
      {/* <Button
        variant="outlined"
        sx={{ background: '#4A276B', color: 'white', marginRight: 1 }}
        onClick={() => onUpdateSubscription('Active')}
      >
       
      </Button> */}
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => onUpdateSubscription('Active')}
            sx={{ margin: "5px 5px 10px 0px", background: '#4A276B' }}
          >
       Deactivate
          </StyledButton>
      {/* <Button
        variant="outlined"
        sx={{ background: '#4A276B', color: 'white' }}
        onClick={() => onUpdateSubscription('Inactive')}
      >
        Deactivate
      </Button> */}
   
    </div>
  );
};

const PaymentMethods = ({ paymentMethods, onUpdatePaymentMethods }) => {
  return (
    <div>
      <Typography variant="h5">Payment Methods:</Typography>
      <List>
        {paymentMethods.map((method, index) => (
          <ListItem key={index}>
            <ListItemText primary={method} />
          </ListItem>
        ))}
      </List>

    </div>
  );
};

const PaymentHistory = ({ history }) => {
  return (
    <div>
      <Typography variant="h5">Payment History:</Typography>
      <List>
        {history.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Date: ${entry.date}, Amount: ${entry.amount}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const AdminActions = () => {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <Typography variant="h5">Subscription:</Typography>
      <FormControl fullWidth required margin="normal">
      <InputLabel sx={{width:"80%"}}>Select</InputLabel>
                <Select
                //   value={supportAgent[index]}
                  onChange={(event) => {
                    // const newSupportAgents = [...supportAgent];
                    // newSupportAgents[index] = event.target.value;
                    // setSupportagent(newSupportAgents);
                  }}
                >
                  <MenuItem value="agentOne">Upgrade</MenuItem>
                  <MenuItem value="agentTwo">Downgrade</MenuItem>
                  <MenuItem value="agentThree">Cancel</MenuItem>
                </Select>
                 </FormControl>
      <StyledButton
            variant="contained"
            color="primary"
            // onClick={() => setSubscriptions}
            sx={{ margin: "5px 5px 10px 0px", background: '#4A276B' }}
          >
          Change Subscription
          </StyledButton>
    </div>
  );
};

export default UserSubscriptionDetails;
