<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
   <h1>Movie_API called Popcorny</h1>
   <p>Users will be able to acces information about different movies, directors, and genres as well as set up and update their profile where they can store their favourite movies.</p>
   <h2>Features</h2> 
    <ol>
        <li>Return a list of ALL movies </li>
        <li>Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user</li>
        <li>Return data about a genre (description) by name/title (e.g., “Thriller”)</li>
        <li>Return data about a director (bio, birth year, death year) by name</li>
        <li>Allow new users to register</li>
        <li>Allow users to update their user info (username)</li>
        <li>Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)</li>
        <li>Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)</li>
        <li>Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)</li>
    </ol>

    <h2>API endpoints</h2>
    <ol>

            <li>
                <li>Business Logic</li>
                <li>URL</li>
                <li>HTTP Method</li>
                <li>Query Parameters</li>
                <li>Request body data format</li>
                <li>Response body data format</li>
            </li>

        <ol>
            <li>
                <li>Get a list of the movies</li>       
                <li>/movies</li>
                <li>GET</li> 
                <li>-</li>
                <li>-</li>
                <li>A JSON object holding data about all the movies</li>         
            </li>

            <li>
                <li>Get data about the movie by title</li>
                <li>/movies/[title]</li>
                <li>GET</li>
                <li>[title]</li>
                <li>-</li>
                <li>A JSON object holding data about a single movie, containing a title, description, imgURL, author data and genres of the movie. Example:
                    {
                        title: "Shutter Island",
                        description:"",
                        imgURL:"",
                        author:{name: "Martin Scorsese",
                                biography:""},
                        genre:{name:"Mystery, Thriller"
                               description:""},
                      },
                </li>
            </li>
            <li>
                <li>Get Genre by Name</li>
                <li>/movies/genre/[genreName]</li>
                <li>GET<li/li>li
                <li>[genreName]</li>
                <li>-</li>
                <li>A JSON object holding data about the genre of a movie</li>
            </li>
            <li>  
                <li>Get director data by name</li>
                <li>/movies/directors/[authorName]</li>
                <li>GET</lili>
                <li>[authorName]</li>
                <li>-</li>
                <li>A JSON object holding data about the data of a director</li>
            </li>


            <li>
                <li>Allow new users to Register</li>
                <li>/users</li>
                <li>POST</li>
                <li>-</li>
                <li>A JSON object holding data about the users to add, example: { name : "Vinko", "favoriteMovie" : [] } </li>
                <li>A JSON object holding data about added user,example: { "name" : "Matija", "favoriteMovies" : [] } with ID </li>
            </li>

            <li>Allow new users update their user info</li>
            <li>/users/[id]</li>
            <li>PUT</li>
            <li>[id]</li>
            <li>-</li>
            <li>A JSON object holding data about the updated info</li>
        </li>
        <li>
            <li>Adds movie to favorite list</li>
            <li>/users/[id]/[movieTitle]</li>
            <li>POST</li>
            <li>[movieTitle]</li>
            <li>-</li>
            <li>A text message indicating whether the Movie was added</li>
        </li>


 <!----         <li>
                <li>Add a movie</li>
                <li>/movies</li>
                <li>POST</li>
                <li>A JSON object holding data about the movie to add, structured like:
                    {
                        title: "Shutter Island",
                        description:"",
                        imgURL:"",
                        author:{name: "Martin Scorsese",
                                biography:""},
                        genre:{name:"Mystery, Thriller"
                               description:""},
                      },             
                </li>
                <li>A JSON object holding data about the movie that was added:
                    title: "Shutter Island",
                    description:"",
                    imgURL:"",
                    author:{name: "Martin Scorsese",
                            biography:""},
                    genre:{name:"Mystery, Thriller"
                           description:""},
                  },
                </li>
            </li>
        --->
            <li>
                <li>
                    <li>remove movie from favorite list</li>
                    <li>/users/[id]/[movieTitle]</li>
                    <li>DELETE</li>
                    <li>[movieTitle]</li>
                    <li>-</li>
                    <li>A text message indicating whether the Movie was removed</li>li
                </li>
                <li>
                    <li>Allow existing users to remove it's data</li>
                    <li>/users/[id]</li>
                    <li>DELETE</li>
                    <li>[id]</li>
                    <li>-</li>
                    <li>A text message indicating whether the User has deregistered</li>
                </li>
        </ol>
</body>
</html># movie_api
