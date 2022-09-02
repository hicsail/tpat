import { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { Button, TextField, Container, Stack } from "@mui/material";

function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log("email", email, "name", name);
    setEmail(email);
    setName(name);
    setUser({
      name: name,
      email: email,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ p: 4 }}>
      {user && (
        <>
          <h3>
            Name
            <small className="text-muted">{user.name}</small>
          </h3>
          <h3>
            Email
            <small className="text-muted">{user.email}</small>
          </h3>
        </>
      )}

      <Stack spacing={4}>
        <TextField value={name} id="Name" label="Name" variant="outlined" />
        <TextField value={email} id="Email" label="Email" variant="outlined" />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {user ? "Re-enter Credentials" : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
}

export default Login;
