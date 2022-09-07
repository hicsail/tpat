import { useContext, useState } from "react";
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
} from "@mui/material";
import { STORAGE_KEYS } from "../constants/storageKeys";

const enum UNIVERSITIES {
  UVA = "UVA",
  UD = "UD",
  JMU = "JMU",
}

function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState(user ? user.email : "");
  const [name, setName] = useState(user ? user.name : "");
  const [university, setUniversity] = useState<UNIVERSITIES>(
    user ? user.university : UNIVERSITIES.UVA
  );

  const handleSubmit = () => {
    console.log("email", email, "name", name);
    const credentials = {
      name: name,
      email: email,
      university: university,
    };
    setUser();
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
  };

  return (
    <Container maxWidth="sm" sx={{ p: 4 }}>
      <Stack spacing={4}>
        <TextField
          value={name}
          id="Name"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          value={email}
          id="Email"
          label="Email"
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
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {user ? "Re-enter Credentials" : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
}

export default Login;
