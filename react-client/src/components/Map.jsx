import React from "react";
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
class Map extends React.Component {
  
  render(){
    const markers = this.props.markers || [];
    return(
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 40.751094, lng: -73.987597 }}>
        {markers.map((marker, index) => (
          <Marker {...marker} />
          )
        )}
      </GoogleMap>
    )
  }
}
//higher functionality component
export default withGoogleMap(Map);