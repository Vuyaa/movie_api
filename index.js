const express = require("express");
const app = express();

let top10Movies = [
  {
    title: "The Lord of the Rings",
    author: "Peter Jackson",
  },
  {
    title: "Harry Potter Serial",
    authors: "David Yates, Mike Newell, Alfonso Cuaron, Chris Columbus",
  },
  {
    title: "Interstellar",
    author: "Christopher Nolan",
  },
  {
    title: "Inception",
    author: "Christopher Nolan",
  },
  {
    title: "The maze runner",
    author: "Wes Ball",
  },
  {
    title: "Shawshank redemption",
    author: "Frank Darabont",
  },
  {
    title: "Forrest Gump",
    author: "Robert Zemeckis",
  },
  {
    title: "The Green Mile",
    author: "Frank Darabont",
  },
  {
    title: "Pan's labyrinth",
    author: "Guillermo del Toro",
  },
  {
    title: "Shutter Island",
    author: "Martin Scorsese",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my popcorny app!");
});

app.get("/movies", (req, res) => {
  res.json(top10Movies);
});

app.use(express.static('./public'));

// listen for requests
app.listen(8080, () => {
  console.log("Your owl is listening on port 8080.");
});
