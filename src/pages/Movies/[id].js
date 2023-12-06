// pages/movies/[id].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MoviesPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const category = id.replace(/%20/g, " ");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        const apiUrl = getApiUrl(category);

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    fetchData();
  }, [category]);

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
      <h3 className="text-3xl text-white font-bold mx-5 p-2 text-center bg-[#276060] rounded-full ">
        {category} Movies
      </h3>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - Poster: {movie.poster_path}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;