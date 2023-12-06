import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import Link from "next/link";
import { StarIcon } from '@heroicons/react/solid';

const MoviesPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { category, genre } = router.query;
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let apiUrl;

      if (category) {
        apiUrl = getApiUrl(category);
      } else if (genre) {
        apiUrl = getApiUrlByGenre(genre);
      } else {
        // Handle case when neither category nor genre is provided
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI',
        },
      };

      try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [category, genre, id]);

  useEffect(() => {
    const fetchMoviesGenres = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmMTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI",
        },
      };
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list',
          options
        );
        const data = await response.json();

        setMoviesGenres(data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchMoviesGenres();
  }, []);

  const getGenreNames = (genreIds) => {
    if (!moviesGenres || moviesGenres.length === 0) {
      return ['Unknown Genre'];
    }

    return genreIds.map((genreId) => {
      const genre = moviesGenres.find((g) => g.id === genreId);
      return genre ? genre.name : 'Unknown Genre';
    });
  };

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

  const getApiUrlByGenre = (genreId) => {
    return `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
  };

  return (
    <div>
      <Navbar />
      <div className='mt-10 lg:px-50 md:px-40 sm:px-20 xs:px-5'>
        <h3 className="text-3xl text-white font-bold mx-5 p-2 text-center bg-[#276060] rounded-full">
          {category ? `${category} Movies` : 'Movies by Genre'}
        </h3>
        <div className="grid my-10 justify-items-center items-center lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1 xs:grid-cols-1 xs:gap-3">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
                <Link href={{ pathname: '/One-Movie', query: { id: movie.id } }} ><li key={movie.id} className="list-none rounded-md group relative mb-5">
                <div className="absolute top-0 left-0 bg-yellow-500 p-2 rounded-tl-3xl  rounded-br-md flex items-center">
                  <StarIcon className="w-6 h-6 text-white" />
                  <span className="text-white ml-2 font-bold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name}
                  className="w-full h-80 object-cover rounded-3xl"
                />
                <div className="absolute top-0 left-0 w-full h-0 flex flex-col font-bold text-center justify-center items-center bg-[#142e2edb] rounded-3xl opacity-0 group-hover:h-full group-hover:opacity-100 duration-500 pt-10 pr-5 pl-5">
                  <p className=" text-center text-2xl text-white mb-8">{movie.title}</p>
                  <p>Language: {movie.original_language === 'en' ? 'English' : movie.original_language === 'hi' ? 'Hindi' :
                    movie.original_language === 'ja' ? 'Japanese' : movie.original_language === 'ar' ? 'Arabic' :
                      movie.original_language === 'mn' ? 'Mongolian' : movie.original_language === 'ko' ? 'Korean' :
                        movie.original_language === 'it' ? 'Italian' : movie.original_language === 'fr' ? 'French' :
                          movie.original_language === 'zh' ? 'Zhuang' : ''}</p>
                </div>
              </li></Link>
            ))
          ) : (
            <li>No movies available</li>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;
