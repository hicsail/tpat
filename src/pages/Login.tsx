import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import {
  Button,
  TextField,
  Container,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../constants/screens";
const TAG = "Login.tsx ";

const enum UNIVERSITIES {
  UVA = "UVA",
  UD = "UD",
  JMU = "JMU",
}

function Login() {
  const { user, setUser } = useContext(UserContext);
  console.log(TAG, "user", user);

  const [email, setEmail] = useState(user ? user.email : "");
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");

  const [university, setUniversity] = useState<UNIVERSITIES>(
    user ? user.university : UNIVERSITIES.UVA
  );

  const navigate = useNavigate();

  const handleSubmit = () => {
    const credentials = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      university: university,
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
          This performance task assignment is expected to take 45 minutes,
          including a tutorial to the performance task recording tool. Please
          note that you will only be able to access and complete the tasks a
          single time.
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
            label="Name"
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
          <FormControl>
            <InputLabel id="demo-simple-select-label">University</InputLabel>
            <Select
              id="university-select"
              value={university}
              label="University"
              onChange={(e) => setUniversity(e.target.value as UNIVERSITIES)}
            >
              <MenuItem value={UNIVERSITIES.UVA}>UVA</MenuItem>
              <MenuItem value={UNIVERSITIES.UD}>UD</MenuItem>
              <MenuItem value={UNIVERSITIES.JMU}>JMU</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            {user ? "Re-enter Credentials" : "Submit"}
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
