import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';


class Location extends React.Component {
  render() {
    return (
      <Container id="Location">
        {this.props.locationObj.display_name &&
        <Card id="locationCard" className="m-3 pb-4">
            <Card.Title className="m-4">{this.props.locationObj.display_name}</Card.Title>
            <Card.Subtitle>Latitude/Longitude: {this.props.locationObj.lat}, {this.props.locationObj.lon}</Card.Subtitle>
            
            
        </Card>
        }

        {this.props.error &&
        <Error error={this.props.locationError} />
        }
      </Container>
    )
  }
}

export default Location;