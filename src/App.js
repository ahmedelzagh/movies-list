import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await fetch("https://swapi.py4e.com/api/films");
      if (!res.ok) {
        throw new Error(`An Error has occurred!!!, status: ${res.status}`);
      }
      const data = await res.json();
      const transformData = data.results.map((movie) => {
        return { id: movie.episode_id, title: movie.title, openingText: movie.opening_crawl, releaseDate: movie.release_date };
      });
      setMovies(transformData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMoviesHandler();
  }, [getMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && !error && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
