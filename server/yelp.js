// TODO : Make a get request to the Yelp API and get a list of locations

var yelpToken = () => {
	//should be used to acquire the initial yelp token?
};
//takes an object
var yelpRequest = (location, term = food, dist = 1000) => {
  const long = location.longitude;
  const lat = location.latitude;
  const url = `https://api.yelp.com/v3/businesses/search&term=${term}&latitude=${lat}&longitude=${long}&radius=${dist}&limit=20`;

  axios.get(url)
    .then((res) => {
      // convert the data into a form that can be read by the google api
      var list = [];
      for (var i = 0; i < res.businesses.length; i++) {
      	list.push(res.businesses[i].coordinates);
      }
      console.log('our list of places', list);
      return list;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports.yelpRequest = yelpRequest;