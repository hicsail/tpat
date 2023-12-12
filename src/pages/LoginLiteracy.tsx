import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Button, TextField, Container, Stack, Typography } from "@mui/material";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../constants/screens";
const TAG = "LoginLiteracy.tsx ";

function LoginLiteracy() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState(user ? user.email : "");
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [inputErrors, setInputErrors] = useState({
    email: false,
    firstName: false,
    lastName: false,
  });
  const navigate = useNavigate();

  const validateInput = () => {
    const newErrorState = { email: false, firstName: false, lastName: false };
    if (!firstName || firstName.length < 2) {
      newErrorState.firstName = true;
    }

    if (!lastName || lastName.length < 2) {
      newErrorState.lastName = true;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email || !email.match(emailRegex)) {
      newErrorState.email = true;
    }

    setInputErrors(newErrorState);
    //retrun true if all error states are false
    return Object.values(newErrorState).every((v) => v == false);
  };

  const handleSubmit = () => {
    if (!validateInput()) {
      return;
    }
    const credentials = {
      ...user,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    setUser(credentials);
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
    navigate("/literacy");
  };

  return (
    <Container maxWidth="sm" sx={{ p: 4, flexGrow: 1 }}>
      <Stack alignContent="center">
        <Typography variant="h3" textAlign={"center"}>
          Welcome to the Performance Task Site!
        </Typography>

        <Typography variant="body1" mt={2} textAlign={"center"}>
          When you are ready to begin, enter your credentials below:
        </Typography>
        <Stack spacing={4} mt={10} mb={10}>
          <TextField
            value={firstName}
            id="Name"
            label="First name"
            variant="outlined"
            error={inputErrors.firstName}
            helperText={
              inputErrors.firstName ? "A valid first name is required." : ""
            }
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            value={lastName}
            id="LastName"
            label="Last name"
            required
            variant="outlined"
            error={inputErrors.lastName}
            helperText={
              inputErrors.lastName ? "A valid last name is required." : ""
            }
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            value={email}
            type={"email"}
            id="Email"
            label="University email"
            error={inputErrors.email}
            helperText={inputErrors.email ? "A valid email is required." : ""}
            required
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

export default LoginLiteracy;
