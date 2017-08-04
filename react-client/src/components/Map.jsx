import React from "react";
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const io = require('socket.io-client');
const socket = io();

class Map extends React.Component {
  constructor(props){
    super(props);
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
      <GoogleMap defaultZoom={15} center={ this.props.center } defaultCenter={ this.props.center }>
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
        {console.log("MIDPOINT IN MAP", this.props.center)}
        <Marker
          key="midpoint"
          position={ this.props.center }
          label="Midpoint"
          icon={{ url: "./images/midPointIcon.png" }}
          />
      </GoogleMap>
    )
  }
}
//higher functionality component
export default withGoogleMap(Map);