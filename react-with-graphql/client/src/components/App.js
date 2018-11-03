import React, { Component } from 'react';
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon } from 'gestalt';
import { Link } from 'react-router-dom'
import Strapi from 'strapi-sdk-javascript/build/main';
import './App.css';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm: '',
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.value });
  }

  filteredBrands = () => {
    const { brands, searchTerm } = this.state;
    return brands.filter(brand => {
      return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    })
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

      this.setState({ brands: response.data.brands });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Container>
        {/* Brands search fields */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            placeholder="Search Brands"
          />
          <Box margin={2}>
            <Icon
              icon="filter"
              color={this.state.searchTerm ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
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
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#d6c8ec'
            }
          }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
          {this.filteredBrands().map(brand => (
            <Box paddingY={4} margin={2} width={200} key={brand._id}>
              <Card
                image={<Box height={200} width={200}>
                  <Image
                    fit="cover"
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
