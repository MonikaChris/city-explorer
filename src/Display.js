import React from 'react';


class Display extends React.Component {
  constructor(props) {
    super(props);

  }
  
    render() {
    return (
      <>
        <h3>{this.props.locationObj.display_name}</h3>
        <h2>Latitude: {this.props.locationObj.lat}</h2>
        <h2>Longitude: {this.props.locationObj.lon}</h2>
        
      </>
    )
  }
}

export default Display;