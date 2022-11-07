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

mongoose.connect("mongodb://localhost:27017/popCorny", {
  useUnifiedTopology: true,
});

// Logging data about visiting different endpoints in log.txt (Time and date, which endpoint was visited)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//JSON object holding data about top10movies such as title and author



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
app.post("/users", (req, res) => {                                                                                             
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {                                                                                        
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
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
});


app.get("/users", (req, res) => {                                                                           
  //Users.find() is mongoose function  (dbMongo=  db.Users.find() it shows list of users )
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      res.status(500).send("Error:" + err);
    });
});

//this is =   db.users.findOne(
//condition   WHERE Username : User.Username

app.get("/users/:Username", (req, res) => {                                                                   
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      // Paramether "user" (it could be named anything) refers to the whole document read in previous line
      res.status(200).json(user);
    }) //Then comes the error handler with .catch() fucntion
    .catch((err) => {
      res.status(500).send("Error:" + err);
    });
});


//Upadate users data
app.put("/users/:Username", (req, res) => {                                                                
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {   //Specifies which atributes are going to be changed
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },    
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => { //calls the function with 2 parameters 1.error and second one is json object(updatedUser)
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});


// Add a movie to a user's list of favorites  
app.post('/users/:Username/movies/:_id', (req, res) => {                                                          
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: {FavoriteMovies: req.params._id}
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete a user by username
app.delete('/users/:Username', (req,res) => {                                                                       
  Users.findOneAndRemove({Username:req.params.Username})
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found');     
    }else{
      res.status(200).send(req.params.Username + ' was deleted');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});



//Delete favorite movie from users favoriteMovie array
app.delete("/users/:Username/movies/:_id", (req, res) => {                                                     
  Users.findOneAndUpdate({Username:req.params.Username},
  {$pull:{FavoriteMovies:req.params._id}},
  {new:true},
  (err,updatedUser) => {
    if(err){
      console.error(err);      
    }else{
     res.json(updatedUser);
    }
  });
});

//To the JSON object above we appended the /movies endpoint to url (movies = /movies)
app.get("/movies", (req, res) => {
  Movies.find()
  .then((Movies) => {
    res.status(200).json(Movies)
  })
  .catch((err) => {
    res.status(500).send('Error: ' + err);
});
});

//get genre by name
app.get("/movies/genres/:Name", (req, res) => {
    Movies.findOne(
    {"Genre.Name":req.params.Name})

  .then((genre) => {
    res.send(genre.Genre);
    })
    .catch((err) => {
      res.status(500).send('Error: ' + err);
    });
  });

  app.get("/movies/directors/:Name", (req, res) => {
    Movies.findOne(
      {"Director.Name" : req.params.Name})

      .then((director) => {
        res.send(director.Director);
      })
      .catch((err) => {
        res.status(500).send("Error : " + err);
      }); 
  });


//Get movie by a title
app.get("/movies/:title", (req, res) => {
  Movies.findOne({Title:req.params.title})
  .then((movie) => {
    res.status(200).json(movie);
  })
  .catch((err) => {
    res.status(500).send('Error' + err)
  });  
});

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
