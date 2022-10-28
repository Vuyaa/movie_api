const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

// Logging data about visiting different endpoints in log.txt (Time and date, which endpoint was visited)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

//JSON object holding data about top10movies such as title and author

let users = [
  {
    id:1,
    name:"Marko",
    favoriteMovies:[]
  },
  {
    id:2,
    name:"Stjepan",
    favoriteMovies:["The Human Centipede"]
  },
];

let top10Movies = [
  {
    title: "The Lord of the Rings",
    author: "Peter Jackson",
    genre: "High fantasy, Adventure ",
  },
  {
    title: "Harry Potter Serial",
    authors: "David Yates, Mike Newell, Alfonso Cuaron, Chris Columbus",
    genre: "Fantasy",
  },
  {
    title: "Interstellar",
    author: "Christopher Nolan",
    genre: "Sci-Fi, Adventure",
  },
  {
    title: "Inception",
    author: "Christopher Nolan",
    genre: "Sci-Fi, Action, Adventure",
  },
  {
    title: "The maze runner",
    author: "Wes Ball",
    genre: "Sci-Fi, Post-apocalyptic, Dystopian",
  },
  {
    title: "Shawshank redemption",
    author: "Frank Darabont",
    genre: "Drama",
  },
  {
    title: "Forrest Gump",
    author: "Robert Zemeckis",
    genre: "Drama, Romance",
  },
  {
    title: "The Green Mile",
    author: "Frank Darabont",
    genre: "Crime, Drama, Fantasy",
  },
  {
    title: "Pan's labyrinth",
    author: "Guillermo del Toro",
    genre: "Drama, Fantasy, War",
  },
  {
    title: "Shutter Island",
    author: "Martin Scorsese",
    genre: "Mystery, Thriller",
  },
];

// GET requests
//This is default page on the server
app.get("/", (req, res) => {
  res.send("Welcome to my popcorny app!");
});

//To the JSON object above we appended the /movies endpoint to url (top10movies = /movies)
app.get("/movies", (req, res) => {
  res.json(top10Movies);
});

//Get movie by a title
app.get("/movies/:title", (req, res) => {
  res.json(
    top10Movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});
//Post new movie in the list
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);
  } else {
    top10Movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

//Delete movie object by title

app.delete("/movies/:title", (req, res) => {
  let movie = top10Movies.find((movie) => {
    return (movie.title = req.params.title);
  });

  if (movie) {
    top10Movies = top10Movies.filter((obj) => {
      return obj.title === req.params.title;
    });
    res.status(201).send("Movie " + req.params.title + " was deleted");
  }
});

//Update user data

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
  res.status(400).send('no such user')
  }
});

/*app.put('/movies/:title/:id' , (req, res) => {
  let movie = top10Movies.find((movie) => {return movie.title === req.params.title});
  
  if (movie){
    movie.title[req.params.title] = parseInt(req.params.id);
    res.status(201).send('Student ' + req.params.title + ' was assigned a grade of ' + req.params.title + ' in ' );
  } else {
    res.status(404).send('Student with the name ' + req.params.title + ' was not found.');
  }
});*/

app.use(express.static("public")); //Instead of using app.get(documentation.html we used express.static method to make all files from folder public reachable using correct endpoint in url based on the file name in folder (eg.documentation.html)

//If an error accours, it logs the error in console
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ups, Boo-Boo happened!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your owl is listening on port 8080.");
});
