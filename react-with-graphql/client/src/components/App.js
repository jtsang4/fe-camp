import React, { Component } from 'react';
import { Container, Box, Heading } from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';
import './App.css';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: []
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `query {
          brands {
            _id
            createdAt
            description
            image {
              _id
              name
              url
            }
          }
        }`
        }
      });

      this.setState({ brands: response.data.brands })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Container>
        {/* Brands section */}
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
          {/* Brands Header*/}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
      </Container>
    );
  }
}

export default App;
