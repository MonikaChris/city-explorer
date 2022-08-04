import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header.js';
import Display from './Display.js'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCity: "",
      locationObj: {},
      map: ""
    };
  }
  
  getLocation = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchedCity}&format=json`;
    const response= await axios.get(url);
    this.setState( {locationObj: response.data[0]});
    this.map(response.data[0].lat, response.data[0].lon);
  }

  map = async (lat, lon) => {
    console.log("Lat: ", this.state.locationObj);
    const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${lat},${lon}&zoom=12`;
    const response = await axios.get(url);
    this.setState({map: response.config.url});
  }

  render() {
    return (
      <Container className="App">
        <Header />
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter a City</Form.Label>
              <Form.Control 
              type="text"
              onChange={(event) => this.setState({ searchedCity: event.target.value})} 
              />
              <Button 
              onClick={this.getLocation}
              as="input" 
              type="submit"
              variant="info"
              value="Explore!" 
              />
            </Form.Group>
          </Form>
          {this.state.locationObj.place_id &&
          <>
            <Display 
            locationObj={this.state.locationObj}
            map={this.state.map}
            />
          </>
          }
      </Container>
    )
  }
}

export default App;
