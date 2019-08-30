const request = require("request");

// Dark sky API
// DARK_SKY_API_KEY: "9f2c9ce56e5ece772dd73509fd46b26f";

// const url =
//   "https://api.darksky.net/forecast/9f2c9ce56e5ece772dd73509fd46b26f/37.8267,-122.4233";
// request({ url: url, json: true }, (err, res) => {
//   if (err) {
//     console.log("Unable to connect to weather server!");
//   } else if (res.body.error) {
//     console.log(res.body.error);
//   } else {
//     console.log(
//       `${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain.`
//     );
//   }
// });

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/9f2c9ce56e5ece772dd73509fd46b26f/${lat},${long}`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to the weather server!", undefined);
    } else if (res.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const weatherInfo = `${res.body.daily.data[0].summary} It is currently ${
        res.body.currently.temperature
      } degrees out and the humidity is ${res.body.currently.humidity *
        100}%. There is a ${res.body.currently.precipProbability *
        100}% chance of rain. Today the highest temperature is ${
        res.body.daily.data[0].temperatureMax
      } degrees and lowest temperature is ${
        res.body.daily.data[0].temperatureMin
      } degrees`;
      callback(
        undefined,
        weatherInfo
        // 	{
        //     summary: res.body.daily.data[0].summary,
        //     currentTemperature: res.body.currently.temperature,
        //     precipProbability: res.body.currently.precipProbability
        //   }
      );
    }
  });
};

module.exports = forecast;
