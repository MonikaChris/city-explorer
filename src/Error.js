import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

class Error extends React.Component {
  render() {
    return (
      <Container>
        <Card id="error" className="m-5 p-3">
            <Card.Text>Error: {this.props.error}</Card.Text>
        </Card>
      </Container>
    )
  }
}

export default Error;