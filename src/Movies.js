import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Error from './Error.js';
import Accordion from 'react-bootstrap/Accordion';


class Movies extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container id="Movies">
        <Accordion defaultActiveKey="0">
            {this.props.movies.length > 0 &&
            this.props.movies.map((movie, idx) => (
                <Accordion.Item eventKey={idx} key={idx}>
                    <Accordion.Header>{movie.title}</Accordion.Header>
                    <Accordion.Body>
                        <Card>
                            <Card.Text>Plot: {movie.overview}</Card.Text>
                            <Card.Text>Release Date: {movie.released_on}</Card.Text>
                            <Card.Text>Popularity: {movie.popularity} Average Votes: {movie.average_votes} Total Votes: {movie.total_votes}</Card.Text>
                            <Card.Img src={movie.image_url} alt="Movie Poster" />
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            ))
            }
        </Accordion>

        {this.props.moviesError &&
        <Error
        error={this.props.moviesError}
        />

        }
      </Container>
    )
  }
}

export default Movies;