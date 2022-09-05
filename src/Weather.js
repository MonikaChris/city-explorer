import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';


class Weather extends React.Component {

  formatDate = (date) => {
    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }
    const numMonth = date.slice(5, 7);
    const month = months[numMonth];
    const day = date.slice(8);
    const year = date.slice(0, 4);

    return `${month} ${day}, ${year}`;
  }
  
  
  render() {
    return (
      <Container id="weather">
        {this.props.weather.length > 0 &&
        this.props.weather.map((day,idx) => 
            <WeatherDay
            day={day}
            idx={idx} 
            formatDate={this.formatDate}
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
                <Card.Text>{this.props.formatDate(this.props.day.date)}</Card.Text>
                <Card.Text>Weather: {this.props.day.description}</Card.Text>
            </Card>
        )
    }
}

export default Weather;