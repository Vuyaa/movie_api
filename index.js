const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const { send } = require("process");
const mongoose = require("mongoose");
const Models = require("/models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/popCorny", {
  userNewUrlParser: true,
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

let users = [
  {
    id: 1,
    name: "Marko",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Stjepan",
    favoriteMovies: ["The Human Centipede"],
  },
];

let top10Movies = [
  {
    movieID: 1,
    title: "The Lord of the Rings",
    description:
      "A fellowship of hobbits, elves, dwarfs, and men is formed to destroy the ring by casting it into the volcanic fires of the Crack of Doom, where it was forged. They are opposed on their harrowing mission by the evil Sauron and his Black Riders.",
    imgURL:
      "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",
    author: {
      name: "Peter Jackson",
      biography:
        "Sir Peter Robert Jackson ONZ KNZM (born 31 October 1961) is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the third-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide.",
    },
    genre: {
      name: "High fantasy",
      description:
        "High fantasy, or epic fantasy, is a subgenre of fantasy defined by the epic nature of its setting or by the epic stature of its characters, themes, or plot. The term 'high fantasy' was coined by Lloyd Alexander in a 1971 essay, 'High Fantasy and Heroic Romance', which was originally given at the New England Round Table of Children's Librarians in October 1969.",
    },
  },

  {
    movieID: 2,
    title: "Harry Potter Serial",
    description:
      "The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people).",
    imgURL:
      "https://a2.tvspielfilm.de/imedia/9009/10509009,9+nuNdU8aWFKNXe32RmmKWv+oB9lYjGLrBK55Dra3fbZUFZ3+nn+fq5Fi_f_oWjZpajlQ0wForoC0kXLmgQRaw==.jpg",
    author: {
      name: "David Yates",
      biography:
        "David Yates (born 8 October 1963) is an English film director, producer and writer, who has directed feature films, short films, and television productions. He is best known for directing the final four films in the Harry Potter series and the first three films of its prequel series, Fantastic Beasts.His work on the Harry Potter series brought him critical and commercial success along with accolades, such as the British Academy Britannia Award for Excellence in Directing.",
    },
    genre: {
      name: "Fantasy",
      description:
        "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama.",
    },
  },

  {
    movieID: 3,
    title: "Interstellar",
    description:
      "Interstellar is about Earth's last chance to find a habitable planet before a lack of resources causes the human race to go extinct. The film's protagonist is Cooper (Matthew McConaughey), a former NASA pilot who is tasked with leading a mission through a wormhole to find a habitable planet in another galaxy.",
    imgURL:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    author: {
      name: "Christopher Nolan",
      biography:
        "Christopher Nolan CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$ 5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honours throughout his career, in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was appointed Commander of the Order of the British Empire for his services to film.",
    },
    genre: {
      name: "Sci-Fi",
      description:
        "Science fiction (sometimes shortened to Sci-Fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity. Science fiction predicted several existing inventions, such as the atomic bomb, robots and borazon, whose names entirely match their fictional predecessors.",
    },
  },

  {
    movieID: 4,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    imgURL:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
    author: {
      name: "Christopher Nolan",
      biography:
        "Christopher Nolan CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$ 5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honours throughout his career, in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was appointed Commander of the Order of the British Empire for his services to film.",
    },
    genre: {
      name: "Sci-Fi",
      description:
        "Science fiction (sometimes shortened to Sci-Fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, extraterrestrial life, sentient artificial intelligence, cybernetics, certain forms of immortality (like mind uploading), and the singularity. Science fiction predicted several existing inventions, such as the atomic bomb, robots and borazon, whose names entirely match their fictional predecessors.",
    },
  },

  {
    movieID: 5,
    title: "The maze runner",
    description:
      "A teen wakes up in a clearing in the center of a gigantic maze with no memory of his past, finding himself a resident in community of boys who have built a village in the glade and who sends two of its strongest and fittest runners into the maze every morning to find a way out.",
    imgURL:
      "https://upload.wikimedia.org/wikipedia/en/b/be/The_Maze_Runner_poster.jpg",
    author: {
      name: "Wes Ball",
      biography:
        "Wes Ball (born October 28, 1980) is an American film director, visual effects artist and graphic artist. He is best known for directing the 2014 film The Maze Runner, based on James Dashner's novel. Ball also directed the sequel, Maze Runner: The Scorch Trials, which opened in theaters on September 18, 2015, and the third film, Maze Runner: The Death Cure, which opened on January 11, 2018.",
    },
    genre: {
      name: "Dystopian",
      description:
        " A typical dystopian film is one which is often, but not always, set in the future, in a society where the government is corrupt and/or ineffectual. The world within the film often has nightmare-like qualities, though it also usually includes elements of contemporary society. Often, dystopian films function as radical political commentary and as a warning against some element of contemporary society.",
    },
  },

  {
    movieID: 6,
    title: "Shawshank redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit.",
    imgURL: "https://m.media-amazon.com/images/I/519NBNHX5BL._SY445_.jpg",
    author: {
      name: "Frank Darabont",
      biography:
        "Frank Árpád Darabont (born Ferenc Árpád Darabont, January 28, 1959) is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels, such as The Shawshank Redemption (1994), The Green Mile (1999), and The Mist (2007).",
    },
    genre: {
      name: "Drama",
      description:
        "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.",
    },
  },

  {
    movieID: 7,
    title: "Forrest Gump",
    description:
      "Forrest Gump, an innocent and kind-hearted Alabama boy, has been dealing with other people's unkindness nearly all his life. Having grown up with beautiful Jenny, his only friend, Forrest yearns to learn all about the ways of the world and embarks on a mission to find his true purpose in life.",
    imgURL:
      "https://i.ytimg.com/an/Mj9IA9tTfio/7642531020657881441_mq.jpg?v=5f5bf0ff",
    author: {
      name: "Robert Zemeckis",
      biography:
        "Robert Lee Zemeckis (born May 14, 1952) is an American filmmaker. He first came to public attention as the director of the action-adventure romantic comedy Romancing the Stone (1984), the science-fiction comedy Back to the Future film trilogy (1985–1990), and the live-action/animated comedy Who Framed Roger Rabbit (1988). He subsequently directed the satirical black comedy Death Becomes Her (1992) and then diversified into more dramatic fare, including Forrest Gump (1994), for which he won the Academy Award for Best Director and the film won Best Picture. He has directed films across a wide variety of genres, for both adults and families.",
    },
    genre: {
      name: "Drama",
      description:
        "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.",
    },
  },

  {
    movieID: 8,
    title: "The Green Mile",
    description:
      "Stars Tom Hanks as a death row corrections officer during the U.S. Great Depression who witnesses supernatural events that occur after an enigmatic inmate (Michael Clarke Duncan) is brought to his facility. It's just another normal day on the Green Mile for prison guard Paul Edgecomb.",
    imgURL:
      "https://upload.wikimedia.org/wikipedia/en/e/e2/The_Green_Mile_%28movie_poster%29.jpg",
    author: {
      name: "Frank Darabont",
      biography:
        "Frank Árpád Darabont (born Ferenc Árpád Darabont, January 28, 1959) is an American film director, screenwriter and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels, such as The Shawshank Redemption (1994), The Green Mile (1999), and The Mist (2007).",
    },
    genre: {
      name: "Mystery fiction",
      description:
        "The mystery genre is a genre of fiction that follows a crime (like a murder or a disappearance) from the moment it is committed to the moment it is solved. Mystery novels are often called “whodunnits” because they turn the reader into a detective trying to figure out the who, what, when, and how of a particular crime.",
    },
  },

  {
    movieID: 9,
    title: "Pan's labyrinth",
    description:
      "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world. In 1944 Falangist Spain, a girl, fascinated with fairy-tales, is sent along with her pregnant mother to live with her new stepfather, a ruthless captain of the Spanish army.",
    imgURL:
      "https://m.media-amazon.com/images/M/MV5BYzFjMThiMGItOWRlMC00MDI4LThmOGUtYTNlZGZiYWI1YjMyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
    author: {
      name: "Guillermo del Toro",
      biography:
        "Guillermo del Toro Gómez (born October 9, 1964) is a Mexican filmmaker, author, and actor. He directed the Academy Award-winning fantasy films Pan's Labyrinth (2006) and The Shape of Water (2017), winning the Academy Awards for Best Director and Best Picture for the latter.",
    },
    genre: {
      name: "Fantasy",
      description:
        "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama.",
    },
  },

  {
    movieID: 10,
    title: "Shutter Island",
    description:
      "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane. In 1954, up-and-coming U.S. marshal Teddy Daniels is assigned to investigate the disappearance of a patient from Boston's Shutter Island Ashecliffe Hospital.",
    imgURL:
      "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    author: {
      name: "Martin Scorsese",
      biography:
        "Martin Scorsese, original name Martin Marcantonio Luciano Scorsese, (born November 17, 1942, Queens, New York, U.S.), American filmmaker known for his harsh, often violent depictions of American culture. From the 1970s Scorsese created a body of work that was ambitious, bold, and brilliant.",
    },
    genre: {
      name: "Psihological Thriller",
      description:
        "Psychological thriller is a genre combining the thriller and psychological fiction genres. It is commonly used to describe literature or films that deal with psychological narratives in a thriller or thrilling setting.",
    },
  },
];

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

app.post("users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
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

//register new user
/*app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Username is required");
  }
});*/

//Update users name
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("there is no user with given data");
  }
});
//Add new movie to users favoriteMovie array
app.post("/users/:id/favorites/:movieID", (req, res) => {
  const { id, movieID } = req.params;

  let user = users.find((user) => user.id == id);
  let movie = top10Movies.find((movie) => movie.movieID);
  if (user) {
    user.favoriteMovies.push(movie);
    res
      .status(200)
      .send(
        "movie with an id " +
          req.params.movieID +
          " has been added to user " +
          req.params.id +
          "'s array"
      );
  } else {
    res.status(400).send("there is no user with id: " + req.params.id);
  }
});

//Delete user by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    //json.json(users)
    res.status(200).send("user " + req.params.id + " has been deleted");
  } else {
    res.status(400).send("there is no user with id: " + req.params.id);
  }
});
//Delete favorite movie from users favoriteMovie array
app.delete("/users/:id/favorites/:movieID", (req, res) => {
  const { id, movieID } = req.params;

  let user = users.find((user) => user.id == id);
  let movie = top10Movies.find((movie) => movie.movieID);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieID
    );
    res
      .status(200)
      .send(
        `movie with an id ${req.params.movieID} has been removed from user ${req.params.id}'s array`
      );
  } else {
    res.status(400).send("There is no user with id: " + req.params.id);
  }
});

// Get biography and name of the director/author ot he movie
app.get("/movies/directors/:authorName", (req, res) => {
  //const title = req.params.title;
  const { authorName } = req.params;
  const author = top10Movies.find(
    (movie) => movie.author.name === authorName
  ).author;

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(400).send("There is no director specified");
  }
});

//To the JSON object above we appended the /movies endpoint to url (top10movies = /movies)
app.get("/movies", (req, res) => {
  res.json(top10Movies);
});

//get genre by name
app.get("/movies/genre/:genreName", (req, res) => {
  //const title = req.params.title;
  const { genreName } = req.params;
  const genre = top10Movies.find(
    (movie) => movie.genre.name === genreName
  ).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("there is no such genre");
  }
});

//Get movie by a title
app.get("/movies/:title", (req, res) => {
  res.json(
    top10Movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
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
