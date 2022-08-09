import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';


class Location extends React.Component {
  render() {
    return (
      <Container id="Location">
        {this.props.map &&
        <Card id="map" className="m-3">
            <Card.Img src={this.props.map} alt="map"/>
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