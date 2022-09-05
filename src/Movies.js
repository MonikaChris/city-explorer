import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';
import Accordion from 'react-bootstrap/Accordion';


class Movies extends React.Component {
  render() {
    const time = new Date(this.props.movies.timestamp);
    console.log('Timestamp object: ', time);
    return (
      <>
        {this.props.movies.data &&
          <Container id="Movies">
            <Card className="section-heading">
              <Card.Title>Need more inspiration to visit {this.props.searchedCity}? Check out these {this.props.searchedCity}-themed movies!</Card.Title>
            </Card>
            <Accordion defaultActiveKey="0">
              {this.props.movies.data.map((movie, idx) => (
                <Movie
                  idx={idx}
                  movie={movie}
                />
              ))}
            </Accordion>
          </Container>
        }
        {this.props.movies.data &&
          <p className="timestamp">Movie list last updated on {time.getMonth()}/{time.getDate()}/{time.getFullYear()}</p>
        }


        {this.props.moviesError &&
          <Error
            error={this.props.moviesError}
          />}

      </>
    )
  }
}

class Movie extends React.Component {
  render() {
    return (
      <Accordion.Item eventKey={this.props.idx} key={this.props.idx}>
        <Accordion.Header>{this.props.movie.title}</Accordion.Header>
        <Accordion.Body>
          <Card>
            <Card.Text>Plot: {this.props.movie.overview}</Card.Text>
            <Card.Text>Release Date: {this.props.movie.released_on}</Card.Text>
            <Card.Text>Popularity: {this.props.movie.popularity} Average Votes: {this.props.movie.average_votes} Total Votes: {this.props.movie.total_votes}</Card.Text>
            <Card.Img
              id="moviePoster"
              src={this.props.movie.image_url || "src/images/undefinedImage.jpg"}
              alt="Movie Poster" />
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    )
  }
}

export default Movies;