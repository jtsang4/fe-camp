import React from 'react';
import { Box, Heading, Text, Image, Card, Button } from 'gestalt'
import Strapi from 'strapi-sdk-javascript/build/main';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Brews extends React.Component {
  state = {
    brews: [],
    brand: '',
  }

  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `
            query {
              brand (id: "${this.props.match.params.brandId}") {
                _id
                name
                brews {
                  _id
                  name
                  description
                  price
                  image {
                    url
                  }
                }
              }
            }
          `
        }
      })
      this.setState({
        brews: response.data.brand.brews,
        brand: response.data.brand.name,
      })
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
      >
        {/* Brews Section */}
        <Box display="flex" direction="column" alignItems="center">
          {/* Brews Heading */}
          <Heading color="orchid">{this.state.brand}</Heading>
          {/* Brews */}
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: '#bdcdd9'
              }
            }}
            wrap
            shape="rounded"
            display="flex"
            justifyContent="center"
            padding={4}
          >
            {this.state.brews.map((brew) => {
              return (
                <Box paddingY={4} margin={2} width={210} key={brew._id}>
                  <Card
                    image={<Box height={250} width={200}>
                      <Image
                        fit="cover"
                        alt="brand"
                        naturalWidth={1}
                        naturalHeight={1}
                        src={`${apiUrl}${brew.image.url}`}
                      />
                    </Box>}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Box marginBottom={2}>
                        <Text bold size="xl">{brew.name}</Text>
                      </Box>
                      <Text>{brew.description}</Text>
                      <Text color="orchid">${brew.price}</Text>
                      <Box marginTop={2}>
                        <Text bold size="xl">
                          <Button color="blue" text="Add to Cart" />
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Brews;