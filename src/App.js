import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorAdding, setErrorAdding] = useState(null);

  const getMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch("https://movies-list-e8201-default-rtdb.firebaseio.com/movies.json");
      if (!res.ok) {
        throw new Error(`An Error has occurred!!!, status: ${res.status}`);
      }
      const data = await res.json();

      const arrayOfMovies = [];
      for (const movie in data) {
        arrayOfMovies.push({
          id: movie,
          title: data[movie].title,
          openingText: data[movie].openingText,
          releaseDate: data[movie].releaseDate,
        });
      }
      setMovies(arrayOfMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addMovieHandler = async (addedMovie) => {
    setErrorAdding(null);
    try {
      const res = await fetch("https://movies-list-e8201-default-rtdb.firebaseio.com/movies.json", {
        method: "POST",
        body: JSON.stringify(addedMovie),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      setErrorAdding(error.message);
    }
  };
  const deleteMoviesHandler = async (movieID) => {
    try {
      const res = await fetch(`https://movies-list-e8201-default-rtdb.firebaseio.com/movies/${movieID}.json`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMoviesHandler();
  }, [getMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} errorAdding={errorAdding} />
      </section>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && <MoviesList deleteMovie={deleteMoviesHandler} movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && !error && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
