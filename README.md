
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
    <table>
        <thead> 
            <tr>
                <th>Business Logic</th>
                <th>URL</th>
                <th>HTTP Method</th>
                <th>Query Parameters</th>
                <th>Request body data format</th>
                <th>Response body data format</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Get a list of the movies</td>       
                <td>/movies</td>
                <td>GET</td> 
                <td>-</td>
                <td>-</td>
                <td>A JSON object holding data about all the movies</td>         
            </tr>
            <tr>
                <td>Get data about the movie by title</td>
                <td>/movies/[title]</td>
                <td>GET</td>
                <td>[title]</td>
                <td>-</td>
                <td>A JSON object holding data about a single movie, containing a title, description, imgURL, author data and genres of the movie. Example:
                    {
                        title: "Shutter Island",
                        description:"",
                        imgURL:"",
                        author:{name: "Martin Scorsese",
                                biography:""},
                        genre:{name:"Mystery, Thriller"
                               description:""},
                      },
                </td>
            </tr>
            <tr>
                <td>Get Genre by Name</td>
                <td>/movies/genre/[genreName]</td>
                <td>GET</td>
                <td>[genreName]</td>
                <td>-</td>
                <td>A JSON object holding data about the genre of a movie</td>
            </tr>
            <tr>  
                <td>Get director data by name</td>
                <td>/movies/directors/[authorName]</td>
                <td>GET</td>
                <td>[authorName]</td>
                <td>-</td>
                <td>A JSON object holding data about the data of a director</td>
            </tr>
            <tr>
                <td>Allow new users to Register</td>
                <td>/users</td>
                <td>POST</td>
                <td>-</td>
                <td>A JSON object holding data about the users to add, example: { name : "Vinko", "favoriteMovie" : [] } </td>
                <td>A JSON object holding data about added user,example: { "name" : "Matija", "favoriteMovies" : [] } with ID </td>
            </tr>
            <td>Allow new users update their user info</td>
            <td>/users/[id]</td>
            <td>PUT</td>
            <td>[id]</td>
            <td>-</td>
            <td>A JSON object holding data about the updated info</td>
        </tr>
        <tr>
            <td>Adds movie to favorite list</td>
            <td>/users/[id]/[movieTitle]</td>
            <td>POST</td>
            <td>[movieTitle]</td>
            <td>-</td>
            <td>A text message indicating whether the Movie was added</td>
        </tr>
 <!----         <tr>
                <td>Add a movie</td>
                <td>/movies</td>
                <td>POST</td>
                <td>A JSON object holding data about the movie to add, structured like:
                    {
                        title: "Shutter Island",
                        description:"",
                        imgURL:"",
                        author:{name: "Martin Scorsese",
                                biography:""},
                        genre:{name:"Mystery, Thriller"
                               description:""},
                      },             
                </td>
                <td>A JSON object holding data about the movie that was added:
                    title: "Shutter Island",
                    description:"",
                    imgURL:"",
                    author:{name: "Martin Scorsese",
                            biography:""},
                    genre:{name:"Mystery, Thriller"
                           description:""},
                  },
                </td>
            </tr>
        --->
            <tr>
                <tr>
                    <td>remove movie from favorite list</td>
                    <td>/users/[id]/[movieTitle]</td>
                    <td>DELETE</td>
                    <td>[movieTitle]</td>
                    <td>-</td>
                    <td>A text message indicating whether the Movie was removed</td>
                </tr>
                <tr>
                    <td>Allow existing users to remove it's data</td>
                    <td>/users/[id]</td>
                    <td>DELETE</td>
                    <td>[id]</td>
                    <td>-</td>
                    <td>A text message indicating whether the User has deregistered</td>
                </tr>
        </tbody>
   </table>
</body>
</html># movie_api
