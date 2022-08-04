import React from 'react';


class Display extends React.Component {  
    render() {
        console.log("Display: ", this.props.map);
    return (
      <>
        <h3>{this.props.locationObj.display_name}</h3>
        <h2>Latitude: {this.props.locationObj.lat}</h2>
        <h2>Longitude: {this.props.locationObj.lon}</h2>
        <img src={this.props.map} alt="map"/>
      </>
    )
  }
}

export default Display;