import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Location from './Location.js';
import Weather from './Weather.js';
import Map from './Map.js';
import Movies from './Movies.js';


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

            <Container>
                <Movies 
                movies={this.props.movies}
                moviesTime={this.props.moviesTime}
                moviesError={this.props.moviesError}
                />
            </Container>
        </>
    )
  }
}

export default Display;