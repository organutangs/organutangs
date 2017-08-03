import React from "react";
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    const markers = this.props.markers.map(function(obj,index){
      return {
        position:{
          lat:obj.coordinates.latitude,
          lng:obj.coordinates.longitude
        }
      }
    });

    return(
      <GoogleMap
        defaultZoom={15}
        defaultCenter={this.props.center}>
        {markers.map((marker, index) => {
            console.log('marker',marker);
            return(
              <Marker
                key={index}
                position={marker.position}
              />
            )
          }
        )}
      </GoogleMap>
    )
  }
}
//higher functionality component
export default withGoogleMap(Map);