//takes an object
function yelpRequest(location, term = food, dist = 1000) {
  var long =;
  var lat =;
  var url = `https://api.yelp.com/v3/businesses/search&term=${term}&latitude=${lat}&longitude=${long}&radius=${dist}&limit=20`;
  return url;
};