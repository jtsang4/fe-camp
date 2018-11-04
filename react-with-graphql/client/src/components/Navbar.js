import React from 'react';
import { Box, Text, Heading, Image, Button } from 'gestalt';
import { NavLink, withRouter } from 'react-router-dom';
import { getToken, clearToken, cleatCart } from '../utils';

class NavBar extends React.Component {
  handleSignOut = () => {
    clearToken();
    cleatCart();
    this.props.history.push('/');
  }

  render() {
    return getToken() !== null ? <AuthNav handleSignOut={this.handleSignOut} /> : <UnAuthNav />;
  }
}

const AuthNav = ({ handleSignOut }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    <NavLink activeClassName="active" to="/checkout">
      <Text size="md" color="white">Checkout</Text>
    </NavLink>
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2 } width={50} height={50}>
          <Image
            alt="BrewHaha Logo"
            src="../../icons/logo.svg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewHaha
        </Heading>
      </Box>
    </NavLink>
    {/* Sign Out Button */}
    <Button
      color="transparent"
      text="Sign Out"
      inline
      size="md"
      onClick={handleSignOut}
    />
  </Box>
);

const UnAuthNav = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    <NavLink activeClassName="active" to="/signin">
      <Text size="md" color="white">Sign In</Text>
    </NavLink>
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2 } width={50} height={50}>
          <Image
            alt="BrewHaha Logo"
            src="../../icons/logo.svg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewHaha
        </Heading>
      </Box>
    </NavLink>
    <NavLink activeClassName="active"  to="/signup">
      <Text size="md" color="white">Sign Up</Text>
    </NavLink>
  </Box>
)

export default withRouter(NavBar);