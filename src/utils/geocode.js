const request = require("request");

// maxbox API
// Access token = 'pk.eyJ1Ijoia2V2aW5jYWkiLCJhIjoiY2p6dWZmbHl1MGFxdDNobXY0bmR0ZzBldyJ9.dWq8u08cHxMqAZ9xZ4i-jQ'

// const mapboxUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1Ijoia2V2aW5jYWkiLCJhIjoiY2p6dWZmbHl1MGFxdDNobXY0bmR0ZzBldyJ9.dWq8u08cHxMqAZ9xZ4i-jQ&limit=1";

// request({ url: mapboxUrl, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect to mapbox api!");
//   } else if (res.body.features.length === 0) {
//     console.log("Not matched location found!");
//   } else {
//     const latitude = res.body.features[0].center[1];
//     const longitude = res.body.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoia2V2aW5jYWkiLCJhIjoiY2p6dWZmbHl1MGFxdDNobXY0bmR0ZzBldyJ9.dWq8u08cHxMqAZ9xZ4i-jQ&limit=1`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        lat: res.body.features[0].center[1],
        long: res.body.features[0].center[0],
        location: res.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
