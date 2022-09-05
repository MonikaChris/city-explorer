import React from 'react';
import './App.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

class Yelp extends React.Component {
  render() {
    return (
      <>

        {this.props.yelp.length > 0 &&
          <Container>
            <Card className="section-heading">
              <Card.Title>Restaurants in the city of {this.props.searchedCity}</Card.Title>
            </Card>
            <Accordion defaultActiveKey="0">

              {this.props.yelp.map((restaurant, idx) => (
                <Restaurant
                  restaurant={restaurant}
                  idx={idx}
                />
              ))
              }
            </Accordion>
          </Container>
        }
      </>
    )
  }
}

class Restaurant extends React.Component {
  render() {
    console.log(this.props.restaurant);
    return (
      <Accordion.Item eventKey={this.props.idx} key={this.props.idx}>
        <Accordion.Header>
          <b>{this.props.restaurant.name}</b>
          &emsp;&emsp;&emsp;
          Cuisine: {this.props.restaurant.type}
          &emsp;
          Rating: {this.props.restaurant.rating}
          &emsp;
          Price: {this.props.restaurant.price}
        </Accordion.Header>
        <Accordion.Body>
          <Card>
            <a href={this.props.restaurant.url} target="_blank" rel="noopener noreferrer">{this.props.restaurant.name} Website</a>
            <Card.Text>{this.props.restaurant.type}</Card.Text>
            <Card.Text>Price: {this.props.restaurant.price} Rating: {this.props.restaurant.rating}</Card.Text>
            <Card.Img id="yelpImages" src={this.props.restaurant.image_url} />
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    )
  }
}

export default Yelp;