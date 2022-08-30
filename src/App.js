import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getMoviesHandler = async () => {
    setIsLoading(true);
    const res = await fetch("https://swapi.py4e.com/api/film");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      const transformData = data.results.map((movie) => {
        return { id: movie.episode_id, title: movie.title, openingText: movie.opening_crawl, releaseDate: movie.release_date };
      });
      setMovies(transformData);
      setIsLoading(false);
    } else {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !error && <span>Loading...</span>}
        {error && <span>An Error has occurred </span>}
        {!isLoading && !error && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
