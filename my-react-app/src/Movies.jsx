import React, { useState, useEffect } from "react";

export default function Movies() {
  const [moviesPopuler, setMoviesPopuler] = useState([]);
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);

  useEffect(() => {
    const fetchMoviesPopuler = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTVjMmQ4MTIzNTkwODBiZWY4YmY5N2FmM2RlZDFkNSIsInN1YiI6IjY1NjVkZmFiYzJiOWRmMDExZGZkMDRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RJR2ksb0pOMGsh7IYZgFKP4WLZDbM650jhaTRYOi5_4",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US/",
          options
        );
        const data = await response.json();
        setMoviesPopuler(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesPopuler();
  }, []);

  return (
    <div>
      <h3>Populer Movies</h3>
      <ul>
        {moviesPopuler.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Now Playing Movies</h3>
      <ul></ul>
    </div>
  );
}
