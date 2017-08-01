const config = require('./config.js');

// generateMidpoint
// I: Two arrays with 2 elements, the first representing the latitude coordinate and the second element representing the longitude coordinate (e.g [37.4228642, -122.0851557])
// O: An array with two elements which represents the midpoint coordinate

var generateMidpoint = (coord1, coord2) => {
  var avgLat= ( coord1[0] + coord2[0] ) / 2;
  var avgLon = ( coord1[1] + coord2[1] ) / 2;

  return [ avgLat, avgLon ];
};

var google = [37.4228642, -122.0851557];
var home = [37.77594788029151, -122.3985733197085];
console.log(generateMidpoint(google, home));