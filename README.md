
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
                <th>Get a list of the movies</th>       
                <th>/movies</th>
                <th>GET</th> 
                <th>-</th>
                <th>-</th>
                <th>A JSON object holding data about all the movies</th>         
            </tr>

            <tr>
                <th>Get data about the movie by title</th>
                <th>/movies/[title]</th>
                <th>GET</th>
                <th>[title]</th>
                <th>-</th>
                <th>A JSON object holding data about a single movie, containing a title, description, imgURL, author data and genres of the movie. Example:
                    {
                        title: "Shutter Island",
                        description:"",
                        imgURL:"",
                        author:{name: "Martin Scorsese",
                                biography:""},
                        genre:{name:"Mystery, Thriller"
                               description:""},
                      },
                </th>
            </tr>
            <tr>
                <th>Get Genre by Name</th>
                <th>/movies/genre/[genreName]</th>h
                <th>GET</th>
                <th>[genreName]</th>
                <th>-</th>
                <th>A JSON object holding data about the genre of a movie</th>
            </tr>
            <tr>  
                <th>Get director data by name</th>
                <th>/movies/directors/[authorName]</th>
                <th>GET</th>
                <th>[authorName]</th>
                <th>-</th>
                <th>A JSON object holding data about the data of a director</th>
            </tr>


            <tr>
                <th>Allow new users to Register</th>
                <th>/users</th>
                <th>POST</th>
                <th>-</th>
                <th>A JSON object holding data about the users to add, example: { name : "Vinko", "favoriteMovie" : [] } </th>
                <th>A JSON object holding data about added user,example: { "name" : "Matija", "favoriteMovies" : [] } with ID </th>
            </tr>

            <th>Allow new users update their user info</th>
            <th>/users/[id]</th>
            <th>PUT</th>
            <th>[id]</th>
            <th>-</th>
            <th>A JSON object holding data about the updated info</th>
        </tr>
        <tr>
            <th>Adds movie to favorite list</th>
            <th>/users/[id]/[movieTitle]</th>
            <th>POST</th>
            <th>[movieTitle]</th>
            <th>-</th>
            <th>A text message indicating whether the Movie was added</th>
        </tr>


 <!----         <tr>
                <th>Add a movie</th>
                <th>/movies</th>
                <th>POST</th>
                <th>A JSON object holding data about the movie to add, structured like:
                    {
                        title: "Shutter Island",
                        description:"",
                        imgURL:"",
                        author:{name: "Martin Scorsese",
                                biography:""},
                        genre:{name:"Mystery, Thriller"
                               description:""},
                      },             
                </th>
                <th>A JSON object holding data about the movie that was added:
                    title: "Shutter Island",
                    description:"",
                    imgURL:"",
                    author:{name: "Martin Scorsese",
                            biography:""},
                    genre:{name:"Mystery, Thriller"
                           description:""},
                  },
                </th>
            </tr>
        --->
            <tr>
                <tr>
                    <th>remove movie from favorite list</th>
                    <th>/users/[id]/[movieTitle]</th>
                    <th>DELETE</th>
                    <th>[movieTitle]</th>
                    <th>-</th>
                    <th>A text message indicating whether the Movie was removed</th>
                </tr>
                <tr>
                    <th>Allow existing users to remove it's data</th>
                    <th>/users/[id]</th>
                    <th>DELETE</th>
                    <th>[id]</th>
                    <th>-</th>
                    <th>A text message indicating whether the User has deregistered</th>
                </tr>
        </tbody>
   </table>
