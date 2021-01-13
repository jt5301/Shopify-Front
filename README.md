# Movie Rating

Hey! This app lets you rate movies. The app ~is~ was originally made with React, Material-UI, Node, Express and MongoDB. I'd like to incorporate GraphQL into the server eventually, just to see if I can simplify the calls I get from the server (and also to learn how to use GraphQL).


## Edit:
In the process of using GraphQL. The frontend is currently using Apollo to communicate with my GraphQL server, grabbing all neccesary information to display the movies and relevant DB info correctly. Essentially this has replaced all the GET routes that the frontend needed. Currently in the process of writing mutations for writing to the MongoDB database.

## Edit 2:
Everything is now moved successfully onto a GraphQL server located on a single endpoint (using express). I'm also using Apollo Client on the frontend to communicate with the server. Funtionality wise though, everything is more or less the same as when it was made using a MERN stack.
Deployed Version is here! https://jt-ratethismovie.herokuapp.com/
## Getting started

Download / clone the project. You'll need to create an env file storing two variables. Place your env file in the server folder:

One is a key to OMDB's api. You can find information on obtaining one [here](http://www.omdbapi.com/).

The other is a connection string for a MongoDB cluster. I found their docs pretty easy to follow for setting up in Node
[here](https://docs.atlas.mongodb.com/getting-started/).

The variable names are:

mongodbConnect= "your connection string here"

omdbKey= "your omdb key here"

Once you added the env variables, run npm install in both server and client folders to download all neccesary dependencies. You can use npm run dev in the top level of the project to run both server and client.

## The App

There's three main sections of the app.

One is the search bar above. This is pretty self-explanatory! Enter in some key words to find a movie (The main page when you start the app is focused on Twilight. Feel free to search for other movies.)

Two is the main display for all the movies. Here you can give a thumbs up or thumbs down to a movie. Once a movie gets a rating, it gets added to your mongoDB collection. You can only vote once (you can also take back a thumbs up and give a thumbs down instead, but you can't do both). Since this is a prototype, you can get around this by refreshing the page and voting again. A next step would be to add user login functionality, so that every user can be tracked regarding voting on a movie once.

The third section is the more info overlay. You can find more details about the movie here, including writers, cast, year of release, a larger poster, etc., as well as go to their dedicated imdb page (you'll be redirected to the movie when you return to the page).

![movierating demo](http://g.recordit.co/hA9ZqISh6D.gif)

~I also added a loading animation to give the app some time to grab the numbers for the thumbs up and thumbs down, so that the user doesn't see the counters go from 0 to whatever number exists for the movie in the database.~ This loading animation now works when Apollo is in the loading state of fetching data. Since Apollo caches, if you enter a term that was previously searched for, Apollo just gets from the cache (which is updated if there are any changes made), making loading much faster / nonexistent.

Thank you for checking this out!
# Shopify-Front
