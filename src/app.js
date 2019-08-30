const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Kevin Cai"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help Message:",
    title: "Help",
    name: "Kevin Cai"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kevin Cai"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided!" });
  }

  const { address } = req.query;

  geocode(address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errMessage: "Help article not found",
    name: "Kevin Cai",
    title: "404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errMessage: "404, page not found",
    name: "Kevin Cai",
    title: "404"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
