import React from 'react';
import { Box, Heading, Text, Image, Card, Button, Mask, IconButton } from 'gestalt'
import Strapi from 'strapi-sdk-javascript/build/main';
import { Link } from 'react-router-dom'

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Brews extends React.Component {
  state = {
    brews: [],
    brand: '',
    cartItems: [],
  }

  addItem = (brew) => {
    const alreadyInCartIndex = this.state.cartItems.findIndex(item => item._id === brew._id);

    if (alreadyInCartIndex === -1) {
      const updatedCartItems = [...this.state.cartItems, {
        ...brew,
        quantity: 1,
      }];
      this.setState({ cartItems: updatedCartItems });
    } else {
      const updatedCartItems = [...this.state.cartItems];
      updatedCartItems[alreadyInCartIndex].quantity += 1;
      this.setState({ cartItems: updatedCartItems });
    }
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
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: 'wrap-reverse'
          }
        }}
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
                          <Button color="blue" text="Add to Cart" onClick={() => this.addItem(brew)} />
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* User Cart */}
        <Box alignSelf="end" marginTop={2} marginLeft={8}>
          <Mask shape="rounded" wash>
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              padding={2}
            >
              {/* User Cart Heading */}
              <Heading align="center" size="md">Your Cart</Heading>
              <Text color="gray" italic>
                {this.state.cartItems.length} items selected
              </Text>

              {/* Cart Items */}
              {this.state.cartItems.map((cartItem) => (
                <Box key={cartItem._id} display="flex" alignItems="center">
                  <Text>
                    {cartItem.name} x {cartItem.quantity} - ${cartItem.quantity * cartItem.price.toFixed(2)}
                  </Text>
                  <IconButton accessibilityLabel="Delete Item" icon="cancel" size="sm" iconColor="red" />
                </Box>
              ))}

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box margin={2}>
                  {this.state.cartItems.length === 0 && (
                    <Text color="red">Please select some items</Text>
                  )}
                </Box>
                <Text size="lg">Total: ${
                  this.state.cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0).toFixed(2)
                }</Text>
                <Text>
                  <Link to="/checkout">Checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>
      </Box>
    );
  }
}

export default Brews;