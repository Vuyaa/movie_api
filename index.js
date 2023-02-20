const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const { send } = require("process");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const cors = require("cors");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

/*mongoose.connect("mongodb://localhost:27017/popCorny", {
  useUnifiedTopology: true,
});*/

mongoose.connect( process.env.CONNECTION_URI, { useUnifiedTopology: true });

// Logging data about visiting different endpoints in log.txt (Time and date, which endpoint was visited)
/** 
 * send index.html file at endpoint "/"
*/
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//JSON object holding data about top10movies such as title and author

let allowedOrigins = ["https://poppcorny.netlify.app", "http://localhost:4200", "https://vuyaa.github.io"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

// GET requests
//This is default page on the server
app.get("/", (req, res) => {
  res.send("Welcome to my popcorny app!");
});

//Add a user
/* We’ll expect JSON in this format
body:
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

//mongoose new user

/** 
 * POST new user upon registration if a matching user is not found.
 * Perform checks on Username, Password and Email fields +
 * Hash the user's password
 * @name registerUser
 * @kind function
 * @returns new user object
*/
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error:" + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error:" + error);
      });
  }
);
/**
 * GET all Users
 * @requires passport
 */
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    //Users.find() is mongoose function  (dbMongo=  db.Users.find() it shows list of users )
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        res.status(500).send("Error:" + err);
      });
  }
);


/**
 * GET a user by Username
 * request: bearer token
 * @name getUser
 * @kind function
 * @param {string} Username user's Username
 * @requires passport
 * @returns the user object
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        // Paramether "user" (it could be named anything) refers to the whole document read in previous line
        res.status(200).json(user);
      }) //Then comes the error handler with .catch() fucntion
      .catch((err) => {
        res.status(500).send("Error:" + err);
      });
  }
);

/**
 * PUT update users data
 * Perform checks on Username, Password and Email fields
 * Hash the user's password
 * Reguest: Bearer token, user object
 * @name updateUser
 * @kind function
 * @param {string} Username user's Username
 * @requires passport
 * @returns A JSON object holding the updated user data, including their ID
 */
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);
/**
 * POST movie to user's list of favorites
 * Request: Bearer token
 * @name addFavorite
 * @kind function
 * @param {string} Username user's Username
 * @param {string} MovieID id of the movie
 * @requires passport
 * @returns the user object with the new favorite movie added to the FavoriteMovies array
 */

app.post(
  "/users/:Username/movies/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params._id },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * DELETE user
 * requires bearer token
 * @name deleteUser
 * @kind function
 * @param {string} Username user's Username
 * @requires passport
 * @returns A text message indicating whether the user was successfully deregistered 
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error:" + err);
      });
  }
);

/**
 * DELETE users favorite movie
 * requires bearer token
 * @name deleteFavorite
 * @kind function
 * @param {string} Username user's Username
 * @param {string} MovieID movie's ID
 * @requires passport
 * @returns a message to the user stating that the movie has been removed
 */
app.delete(
  "/users/:Username/movies/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params._id } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * GET a list of all movies
 * request: bearer token
 * @name getMovies
 * @kind function
 * @requires passport
 * @returns the movies array of objects
 */
app.get(
  "/movies", //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find()
      .then((Movies) => {
        res.status(200).json(Movies);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);
/**
 * GET genre details
 * @name getGenre
 * @kind function
 * @param {string} Name the name of the genre
 * @requires passport
 * @returns A JSON object holding the name, description and movies of a genre
 */
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })

      .then((genre) => {
        res.send(genre.Genre);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * GET director bio
 * @name getDirector
 * @kind function
 * @param {string} Name the name of the director
 * @requires passport
 * @returns A JSON object holding data about the specified director including their movies
 */
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })

      .then((director) => {
        res.send(director.Director);
      })
      .catch((err) => {
        res.status(500).send("Error : " + err);
      });
  }
);

/**
 * GET data about a single movie by title
 * @name getMovie
 * @kind function
 * @param {string} Title title of the movie
 * @requires passport
 * @returns the movie object
 */
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.title })
      .then((movie) => {
        res.status(200).json(movie);
      })
      .catch((err) => {
        res.status(500).send("Error" + err);
      });
  }
);

app.use(express.static("public")); //Instead of using app.get(documentation.html we used express.static method to make all files from folder public reachable using correct endpoint in url based on the file name in folder (eg.documentation.html)

//If an error accours, it logs the error in console
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ups, Boo-Boo happened!");
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
