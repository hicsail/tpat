import { useRef, useContext } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserContext } from "../store/UserContext";

function Login() {
  const { user, setUser } = useContext(UserContext);

  const emailRef = useRef();
  const nameRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      "usernameRef",
      nameRef.current.value,
      "emailRef",
      emailRef.current.value
    );
    setUser({
      name: nameRef.current.value,
      email: emailRef.current.value,
    });
  };

  return (
    <>
      {user && (
        <>
          <h3>
            Name
            <small class="text-muted">{user.name}</small>
          </h3>
          <h3>
            Email
            <small class="text-muted">{user.email}</small>
          </h3>
        </>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" ref={nameRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Button variant="primary" type="submit">
          {user ? "Renter Credentials" : "Submit"}
        </Button>
      </Form>
    </>
  );
}

export default Login;
