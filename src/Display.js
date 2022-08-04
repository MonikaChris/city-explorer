import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Display extends React.Component {  
    render() {
        console.log("Display: ", this.props.map);
    return (
      <>
        <Row>
            <Col>
                <Card className="m-3 h-auto p-5" id="locdisplay">
                    <Card.Title className="m-4">{this.props.locationObj.display_name}</Card.Title>
                    <Card.Text>Latitude: {this.props.locationObj.lat}</Card.Text>
                    <Card.Text>Longitude: {this.props.locationObj.lon}</Card.Text>
                </Card>
            </Col>
            <Col>
                <Card className="m-3">
                    <Card.Img src={this.props.map} alt="map"/>
                </Card>
            </Col>
        </Row>
      </>
    )
  }
}

export default Display;