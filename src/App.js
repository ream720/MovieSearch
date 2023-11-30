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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  //function to fetch movies
  const searchMovies = async (title, page = 1) => {
    //async arrow function e.g. async searchMovies(title) {}
    const response = await fetch(`${API_URL}&s=${title}&page=${page}`); //async response API call
    //data = movie data
    const data = await response.json();
    console.log(data);

    setMovies(data.Search);
    setTotalPages(Math.ceil(data.totalResults / 10));
  };

  //useEffect hook = action on component init/load, optional [] empty dependency array to call ONLY ONCE
  useEffect(() => {
    searchMovies("");
  }, []);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    searchMovies(searchTerm, currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      searchMovies(searchTerm, currentPage - 1);
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
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
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={goToPreviousPage}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={goToNextPage}>Next</button>
        )}
      </div>
    </div>
  );
};

export default App;
