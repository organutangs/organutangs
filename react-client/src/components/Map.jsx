import React from "react";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const io = require('socket.io-client');
const socket = io();

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      midpoint: { "lat": 0.0, "lng": 0.0 }
    };
  }

  componentDidMount() {
    socket.on('midpoint', (data) => {
      console.log('midpoint listener data', data);
      this.setState({ midpoint: data });
    });
  }

  render(){
    const markers = this.props.markers.map(function(obj,index){
      return {
        position: {
          lat: obj.coordinates.latitude,
          lng: obj.coordinates.longitude
        },
        label: obj.name,
        key: index
      }
    });

    return(
      <GoogleMap
        defaultZoom={15}
        defaultCenter={ this.props.center }>
        { markers.map((marker, index) => {
            return(
              <Marker
                key={ marker.key }
                position={ marker.position }
                label={ marker.label }
              />
            )
          }
        )}
        <Marker key="midpoint" position={ this.state.midpoint } label="Midpoint" />
      </GoogleMap>
    )
  }
}
//higher functionality component
export default withGoogleMap(Map);