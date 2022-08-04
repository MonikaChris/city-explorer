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
      locationObj: {}
    };
  }
  
  getLocation = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchedCity}&format=json`;
    console.log(url);
    const response= await axios.get(url);
    console.log(response);
    this.setState( {locationObj: response.data[0]});
  }
  
  render() {
    console.log(this.state);
    return (
      <Container className="App">
        <Header />
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter a US City</Form.Label>
              <Form.Control 
              type="text"
              onChange={(event) => this.setState({ searchedCity: event.target.value})} 
              />
              {/*<button onClick={this.getLocation}>Explore!</button>*/}
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
            />
          </>
          }
      </Container>
    )
  }
}

export default App;
