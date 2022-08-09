import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';


class Weather extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container id="weather">
        {this.props.weather.length > 0 &&
        this.props.weather.map((day,idx) => 
            <Card key={idx} id="weatherCard" className="m-3 p-2">
                <Card.Text>Date: {day.date}</Card.Text>
                <Card.Text>Weather: {day.description}</Card.Text>
            </Card>
        )}
        
        {this.props.error &&
        <Error error={this.props.error} />
        }
      </Container>
    )
  }
}

export default Weather;