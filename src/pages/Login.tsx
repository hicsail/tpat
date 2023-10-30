import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import {
  Button,
  TextField,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../constants/screens";
const TAG = "Login.tsx ";


function Login() {
  const { user, setUser } = useContext(UserContext);
  console.log(TAG, "user", user);

  const [email, setEmail] = useState(user ? user.email : "");
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const credentials = {
      ...user,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    setUser(credentials);
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
    navigate(SCREENS.HOME);
  };

  return (
    <Container maxWidth="sm" sx={{ p: 4, flexGrow: 1 }}>
      <Stack alignContent="center">
        <Typography variant="h3" textAlign={"center"}>
          Welcome to the Performance Task Site!
        </Typography>
        <Typography variant="body1" mt={3}>
          The performance task assignment is expected to take 30 minutes, with
          an additional brief tutorial included. Please note that you will only
          be able to access and complete the tasks a single time.
          <Typography fontWeight={800}>
            Do not log into the site until you are ready to begin your three
            performance tasks.
          </Typography>
        </Typography>
        <Typography variant="body1" mt={2}>
          When you are ready to begin, enter your university credentials below:
        </Typography>
        <Stack spacing={4} mt={10} mb={10}>
          <TextField
            value={firstName}
            id="Name"
            label="First name"
            variant="outlined"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            value={lastName}
            id="LastName"
            label="Last name"
            variant="outlined"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            value={email}
            id="Email"
            label="University email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {user ? "Update credentials" : "Submit"}
          </Button>
        </Stack>
        <Typography variant="body1">
          Please reach out to the SimSE Research Team, if you have any questions
          or concerns about the study at teachsimlab@gmail.com. The study has
          been approved by the University of Virginia Institutional Review Board
          (UVA IRB-SBS #2170).
        </Typography>
        <Typography variant="caption" marginTop={5}>
          This site is being developed by a collaborative team of researchers
          from Boston University and University of Virginia with teacher
          candidates from University of Delaware and James Madison University.
        </Typography>
      </Stack>
    </Container>
  );
}

export default Login;
