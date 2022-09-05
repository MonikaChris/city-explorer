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
            locationObj: {},
            map: '',
            weather: [],
            movies: {},
            locationError: '',
            weatherError: '',
            moviesError: '',
            yelp: [],
            yelpError: ''
        }
    }

    getLocation = async (e) => {
        e.preventDefault();
        try {
            const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.searchedCity}&format=json`;
            const response = await axios.get(url);
            this.setState({ locationObj: response.data[0], locationError: "" }, () => this.getMap());
        } catch (err) {
            this.setState({ locationObj: {}, locationErrorMessage: err.message, map: '' })
        }
    }

    getMap = async () => {
        const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12`;
        const response = await axios.get(url);
        this.setState({ map: response.config.url }, () => this.getWeather());
    }

    getWeather = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.locationObj.lat}&lon=${this.state.locationObj.lon}`;
            const response = await axios.get(url);
            this.setState({ weather: response.data, weatherError: '' }, () => this.getYelp());
        }
        catch (err) {
            this.setState({ weather: [], weatherError: err.message });
        }
    }

    getYelp = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER}/yelp?lat=${this.state.locationObj.lat}&lon=${this.state.locationObj.lon}`;
            const response = await axios.get(url);
            console.log(response.data);
            this.setState({ yelp: response.data }, () => this.getMovies());
        } catch (err) {
            this.setState({ yelp: [], yelpError: err.message });
        }
    }

    getMovies = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchedCity}`;
            const response = await axios.get(url);
            //If not from cache, convert to object with timestamp of now
            if (Array.isArray(response.data)) {
                let movieObj = { data: response.data, timestamp: Date.now() };
                this.setState({ movies: movieObj, moviesError: '' });
            } else this.setState({ movies: response.data, moviesError: '' });
        } catch (err) {
            this.setState({ movies: {}, moviesError: err.message });
        }
    }

    render() {
        return (
            <>
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
                        locationObj={this.state.locationObj}
                        weather={this.state.weather}
                        locationError={this.state.locationError}
                        weatherError={this.state.weatherError}
                        map={this.state.map}
                        movies={this.state.movies}
                        moviesError={this.state.moviesError}
                        yelp={this.state.yelp}
                        yelpError={this.state.yelpError}
                        searchedCity={this.state.searchedCity}
                    />
                </Container>
                
            </>
        )
    }
}

export default SearchBar;