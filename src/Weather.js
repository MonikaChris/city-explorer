import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';


class Weather extends React.Component {
  render() {
    return (
      <Container id="weather">
        {this.props.weather.length > 0 &&
        this.props.weather.map((day,idx) => 
            <WeatherDay
            day={day}
            idx={idx} 
            />
        )}
        
        {this.props.error &&
        <Error error={this.props.error} />
        }
      </Container>
    )
  }
}

class WeatherDay extends React.Component {
    render() {
        return (
            <Card key={this.props.idx} id="weatherCard" className="m-3 p-2">
                <Card.Text>Date: {this.props.day.date}</Card.Text>
                <Card.Text>Weather: {this.props.day.description}</Card.Text>
            </Card>
        )
    }
}

export default Weather;