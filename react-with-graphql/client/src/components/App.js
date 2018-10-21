import React, { Component } from 'react';
import { Container, Box, Heading, Card, Image, Text } from 'gestalt';
import { Link } from 'react-router-dom'
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
            name
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
        {/* Brands */}
        <Box
          display="flex"
          justifyContent="around"
        >
          {this.state.brands.map(brand => (
            <Box margin={2} width={200} key={brand._id}>
              <Card
                image={<Box height={200} width={200}>
                  <Image
                    alt="brand"
                    naturalWidth={1}
                    naturalHeight={1}
                    src={`${apiUrl}${brand.image.url}`}
                  />
                </Box>}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">{brand.name}</Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
