import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


class Weather extends React.Component {
  render() {
    return (
      <Container id="weather">
        {this.props.weatherReport.map((day,idx) => 
            <Card key={idx} className="m-3 h-auto p-5">
                <Card.Text>Date: {day.date}</Card.Text>
                <Card.Text>Weather: {day.description}</Card.Text>
            </Card>
        )}
      </Container>
    )
  }
}

export default Weather;