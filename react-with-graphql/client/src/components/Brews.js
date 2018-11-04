import React from 'react';
import Strapi from 'strapi-sdk-javascript/build/main';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Brews extends React.Component {
  async componentDidMount() {
    try {
      const brews = await strapi.request('POST', '/graphql', {
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
      console.log(brews);
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    return (
      <div>Brews</div>
    );
  }
}

export default Brews;