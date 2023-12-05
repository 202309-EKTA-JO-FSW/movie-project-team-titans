import React, { useState, useEffect } from 'react';
import { useNavigate, BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

export default function MoviesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_API_KEY',
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (category) {
      switch (category) {
        case 'Now Playing':
          fetchData('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
          break;
        case 'Popular':
          fetchData('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
          break;
        case 'Top Rate':
          fetchData('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
          break;
        case 'Upcoming':
          fetchData('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1');
          break;
        case 'Trending':
          fetchData('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
          break;
        default:
          break;
      }
    }
  }, [category]);

  return (
    <div>
      <div>
        <h3>{category} Movies</h3>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} - Poster: {movie.poster_path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

