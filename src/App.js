import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header.js';
import Display from './Display.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Weather from './Weather.js';
import Error from './Error.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCity: "",
      locationObj: {},
      map: "",
      error: false,
      errorMessage: "",
      weather: []
    };
  }

  getLocation = async (e) => {
    e.preventDefault();
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchedCity}&format=json`;
      const response = await axios.get(url);
      this.setState({ locationObj: response.data[0], error: false, errorMessage: "" });
      this.map(response.data[0].lat, response.data[0].lon);
    } catch (err) {
      this.setState( {locationObj: {}, error: true, errorMessage: err.message})
    }

    try {
      const url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchedCity}`;
      const response = await axios.get(url);
      this.setState({ weather: response.data});
      console.log('Weather Response: ', response.data);
    }
    catch (err) {
      this.setState( { weather: [], error: true, errorMessage: err.message});
    }
  }

  map = async (lat, lon) => {
    const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${lat},${lon}&zoom=12`;
    const response = await axios.get(url);
    this.setState({ map: response.config.url });
  }

  render() {    
    return (
      <>
        <Header />
        <Container className="App">
          <Form>
            <Row>
              <Col xs={6} sm={7} md={8} lg={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter a City"
                  onChange={(event) => this.setState({ searchedCity: event.target.value })}
                />
              </Col>
              <Col xs={1} s={1} md={1} lg={1}>
                <Button
                  onClick={this.getLocation}
                  as="input"
                  type="submit"
                  variant="info"
                  value="Explore!"
                />
              </Col>
            </Row>
          </Form>
          {this.state.locationObj.place_id &&
            <>
              <Display
                locationObj={this.state.locationObj}
                map={this.state.map}
              />
            </>
          }
          {this.state.weather.length > 0 && 
          <>
          <Weather weatherReport={this.state.weather} />
          </>
          }

          {this.state.error &&
            <Error message={this.state.errorMessage} />
          }
        </Container>
      </>
    )
  }
}

export default App;
