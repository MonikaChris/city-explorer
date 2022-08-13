import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Display from './Display.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedCity: '',
            currentLocationObj: {},
            currentMap: '',
            currentWeather: [],
            currentMovies: [],
            currentLocationError: '',
            currentWeatherError: '',
            currentMoviesError: ''
        }
    }

    getLocation = async (e) => {
        e.preventDefault();
        try {
          const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchedCity}&format=json`;
          const response = await axios.get(url);
          this.setState({ currentLocationObj: response.data[0], currentLocationError: "" }, () => this.getWeather());
          this.getMap(response.data[0].lat, response.data[0].lon);
        } catch (err) {
          this.setState( {currentLocationObj: {}, currentLocationErrorMessage: err.message, currentMap: '' })
        }

        this.getMovies(this.state.searchedCity);
      }
    
      getMap = async (lat, lon) => {
        const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${lat},${lon}&zoom=12`;
        const response = await axios.get(url);
        this.setState({ currentMap: response.config.url });
      }

      getWeather = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.currentLocationObj.lat}&lon=${this.state.currentLocationObj.lon}`;
            console.log('URL: ', url);
            const response = await axios.get(url);
            this.setState({ currentWeather: response.data, currentWeatherError: ''});
          }
          catch (err) {
            console.log(err);
            this.setState( { currentWeather: [], currentWeatherError: err.message });
          }
      }

      getMovies = async (city) => {
        try {
            const url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${city}`;
            const response = await axios.get(url);
            this.setState( {currentMovies: response.data, currentMoviesError: '' });
        } catch (err) {
            this.setState( { currentMovies: [], currentMoviesError: err.message });
        }

      }

    render() {
        return (
            <Container className="App">
                <Container id="searchBar">
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
                </Container>
                <Display 
                locationObj={this.state.currentLocationObj}
                weather={this.state.currentWeather}
                locationError={this.state.currentLocationError}
                weatherError={this.state.currentWeatherError}
                map={this.state.currentMap}
                movies={this.state.currentMovies}
                moviesError={this.state.currentMoviesError}
                />
            </Container>
        )
    }
}

export default SearchBar;