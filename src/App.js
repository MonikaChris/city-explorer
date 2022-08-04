import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header.js';
import Display from './Display.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    console.log(response);
  }

  map = async (lat, lon) => {
    console.log("Lat: ", this.state.locationObj);
    const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${lat},${lon}&zoom=12`;
    const response = await axios.get(url);
    this.setState({map: response.config.url});
  }

  render() {
    console.log(this.state.searchedCity);
    return (
      <>
        <Header/>
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
          </Container>
        </>
    )
  }
}

export default App;
