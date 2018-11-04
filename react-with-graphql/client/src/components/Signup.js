import React from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import ToastMessage from './ToastMessage';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    toast: false,
    toastMessage: '',
  }

  isFormInvalid({ username, email, password }) {
    return !username || !email || !password;
  }

  showToast(toastMessage) {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage }), 5000);
  }

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.isFormInvalid(this.state)) {
      this.showToast('Fill in all fields');
      return;
    }
    console.log('submitted');
    // Sign up user
    try {

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#ebe2da'
            }
          }}
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          {/* Sign Up Form */}
          <form
            style={{
              display: 'inline',
              textAlign: 'center',
              maxWidth: 450,
            }}
            onSubmit={this.handleSubmit}
          >
            <Box
              marginTop={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Let's Get Started</Heading>
              <Text italic color="orchid">Sign up to order some brews!</Text>
            </Box>
            {/* Username Input */}
            <TextField
              id="username"
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />
            {/* Email Address Input */}
            <TextField
              id="email"
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email Address"
            />
            {/* Password Input */}
            <TextField
              id="password"
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            <Button
              inline
              color="blue"
              type="submit"
              text="Submit"
            />
          </form>
        </Box>
        <ToastMessage show={this.state.toast} message={this.state.toastMessage} />
      </Container>
    )
  }
}

export default Signup