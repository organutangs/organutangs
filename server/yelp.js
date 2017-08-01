// TODO : Make a get request to the Yelp API and get a list of locations

//takes an object
function yelpRequest(location, term = food, dist = 1000) {
  var long = ;
  var lat = ;
  var url = `https://api.yelp.com/v3/businesses/search&term=${term}&latitude=${lat}&longitude=${long}&radius=${dist}&limit=20`;

  axios.get(url)
    .then((res) => {
      // do something with the return data
      console.log(coordinates[mid]);
      return list;
    })
    .catch((err) => {
      console.error(err);
    });
};