import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

//37199185
const API_URL = "http://www.omdbapi.com?apikey=37199185";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //function to fetch movies
  const searchMovies = async (title) => {
    //async arrow function e.g. async searchMovies(title) {}
    const response = await fetch(`${API_URL}&s=${title}`); //async response API call
    //data = movie data
    const data = await response.json();

    setMovies(data.Search);
  };

  //useEffect hook = action on component init/load, optional [] empty dependency array to call ONLY ONCE
  useEffect(() => {
    searchMovies("The mummy");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
