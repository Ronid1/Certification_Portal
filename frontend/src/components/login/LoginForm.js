import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../../services/redux/userSlice';
import { UserActions } from "../../services/api/userActions";
import { ProfilesActions } from "../../services/api/profilesActions";
import { InstructorsActions } from "../../services/api/instructorsActions";
import getTrainingsData from "../../services/redux/getTrainingsData";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert'

function LoginForm() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function onSubmit (event) {
    event.preventDefault();
  }

  async function onClick () {
    let user = new UserActions();
    let profile = new ProfilesActions();
    let instructor = new InstructorsActions();
    let name; let admin; let instructorFor = []; let id; let role; let img;

    //send data to backend -> if succssefull get user id, else -> error
    await user.login(email, password).then(res => {
      id = res;
    });

    //if no user was found
    if (!id){
      setError(true);
    }

    //get user info by user id
    await profile.getId(id).then( res => {
      name = res.user_name;
      admin = res.is_admin;
      role = res.role;
      img = res.image;
    });

    //get cert_id user is an instructor for
    await instructor.findByUserId(id).then( res => {
      if(res){
        let size = res.length
        for (let i = 0; i < size; i++)
          instructorFor[i] = res[i].certification_id
      }
    })

    //add to state
    dispatch(login({ 
      id: id, 
      name: name, 
      isAdmin: admin,
      role: role,
      image: img, 
      isLoggedIn: true, 
      instructorFor: instructorFor
    }));
  }


  return(
    <Container >
      <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible>
        <Alert.Heading>Worng cardentials</Alert.Heading>
        <p>
          please try again
        </p>
      </Alert>
      <Form onSubmit = {onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value = {email}
            onChange= { (event) => setEmail(event.target.value) }
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value = {password}
            onChange= { (event) => setPassword(event.target.value) }
          />
        </Form.Group>

        <Button id="btn-primary" type="submit" onClick = {onClick}>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default LoginForm;