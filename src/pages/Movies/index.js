
import React, { useState, useEffect } from "react";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";


const MoviesPage = () => {
  const [moviesByCategory, setMoviesByCategory] = useState({});

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categories = ["Top Rated", "Popular", "Trending", "Now Playing", "Upcoming"];
      const allMovies = {};

      for (const category of categories) {
        const apiUrl = getApiUrl(category);

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          allMovies[category] = data.results;
        } catch (error) {
          console.error(`Error fetching ${category} movies:`, error);
        }
      }

      setMoviesByCategory(allMovies);
    };

    fetchAllCategories();
  }, []);
  const getApiUrl = (category) => {
    switch (category) {
      case "Now Playing":
        return "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      case "Popular":
        return "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      case "Top Rated":
        return "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
      case "Upcoming":
        return "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
      case "Trending":
        return "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      default:
        return "";
    }
  };
  return (
    <div>
      <Navbar />

      <h2>Movies by Category:</h2>
      {Object.entries(moviesByCategory).map(([category, movies]) => (
        <div key={category}>
          <h3>{category} Movies, {movies}</h3>
          {movies ? (
            <ul>
              {movies.length > 0 && (
                <li>
                  <div>
                    <h4>{movies[0].title}</h4>
                    <p>Poster: {movies[0].poster_path}</p>
                  </div>
                </li>
              )}
              {movies.length > 1 && (
                <li>
                  <div>
                    <h4>{movies[1].title}</h4>
                    <p>Poster: {movies[1].poster_path}</p>
                  </div>
                </li>
              )}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default MoviesPage;
