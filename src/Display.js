import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Location from './Location.js';
import Weather from './Weather.js';
import Map from './Map.js';
import Movies from './Movies.js';
import Yelp from './Yelp.js';



class Display extends React.Component {  
    render() {
    return (
       <>
        <Container id="display"> 
                <Container id="locationDisplay">
                        <Location 
                        locationObj={this.props.locationObj}
                        error={this.props.locationError}
                        />
                        <Weather 
                        weather={this.props.weather}
                        error={this.props.weatherError}
                        />
                </Container>
                <Container id="mapDisplay">
                    <Map 
                    map={this.props.map}
                    error={this.props.locationError}
                    />      
                </Container>
            </Container>

            <Container id="yelpDisplay">
                <Yelp
                yelp={this.props.yelp}
                yelpError={this.props.yelpError}
                searchedCity={this.props.searchedCity}
                />
            </Container>

            <Container id="moviesDisplay">
                <Movies 
                movies={this.props.movies}
                moviesError={this.props.moviesError}
                searchedCity={this.props.searchedCity}
                />
            </Container>
        </>
    )
  }
}

export default Display;