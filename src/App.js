import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMoviesHandler = () => {
    setIsLoading(true);
    fetch("https://swapi.py4e.com/api/films")
      .then((res) => res.json())
      .then((data) => {
        const transformData = data.results.map((movie) => {
          return { id: movie.episode_id, title: movie.title, openingText: movie.opening_crawl, releaseDate: movie.release_date };
        });

        setIsLoading(false);
        setMovies(transformData);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{!isLoading ? <MoviesList movies={movies} /> : <span>Loading...</span>}</section>
    </React.Fragment>
  );
}

export default App;
