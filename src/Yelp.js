import React from 'react';
import './App.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

class Yelp extends React.Component {
  render() {
    console.log('Yelp props: ', this.props);
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
    return (
      <Accordion.Item eventKey={this.props.idx} key={this.props.idx}>
        <Accordion.Header>{this.props.restaurant.name}</Accordion.Header>
        <Accordion.Body>
          <Card>
            <Card.Text>Website: {this.props.restaurant.url}</Card.Text>
            <Card.Text>Price: {this.props.restaurant.price} Rating: {this.props.restaurant.rating}</Card.Text>
            <Card.Img src={this.props.restaurant.image_url} />
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    )
  }
}

export default Yelp;