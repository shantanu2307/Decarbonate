import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../firebase/auth";
import { Link, useHistory } from "react-router-dom";

export default function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      var data = await login(emailRef.current.value, passwordRef.current.value);
      console.log(data.user.uid);
      // let url = '/user/' + String(data.user.uid);
      let show = document.getElementsByClassName('loggedin');
      let hide = document.getElementsByClassName('loggedout');
      for (var i of show) {
        i.style['display'] = '';
      }
      for (var i of hide) {
        i.style['display'] = 'none';
      }
      history.push("/user/daily");
      
    } catch {
      setError("Failed to Sign In");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account ? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
