import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import Genres from '@/components/Navbar/genres';
import { getGenreNames } from '@/components/Navbar/helper';


export default function HomePage() {
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [moviesGenres, setMoviesGenres] = useState([]);

  useEffect(() => {
    const fetchMoviesTrending = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTVjMmQ4MTIzNTkwODBiZWY4YmY5N2FmM2RlZDFkNSIsInN1YiI6IjY1NjVkZmFiYzJiOWRmMDExZGZkMDRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RJR2ksb0pOMGsh7IYZgFKP4WLZDbM650jhaTRYOi5_4',
        },

      };
      

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          options
        );
        const data = await response.json();
        setMoviesTrending(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMoviesTrending();
    const fetchMoviesGenres = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI",
        },
      }
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
  

  return (
    <main>
      <div>

        <Navbar />
       
        <br /> <br />
        <div className='lg:px-50 md:px-40 sm:px-30 xs:px-5 relative'>
          <div className="grid justify-items-center items-center lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-2 sm:grid-cols-2 sm:gap-1 xs:grid-cols-1">
            {moviesTrending.map((movie) => (
              <li
                key={movie.id}
                className="list-none bg-gray-300 rounded-md p-4 relative"
                onMouseEnter={() => setHoveredMovie(movie)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <div className="rounded-md p-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-48 h-full object-cover rounded-3xl p-0"
                  />
                </div>
                <p className="mt-2 text-center text-white font-bold bg-gray-800 p-2 rounded-md">{movie.title}</p>

                {hoveredMovie && hoveredMovie.id === movie.id && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="text-white text-center">
                      <p>Language: {hoveredMovie.original_language === 'en' ? 'English' : ''}</p>
                      <p>Rating: {hoveredMovie.vote_average.toFixed(1)}</p>
                      <p className='pt-3'>{getGenreNames(hoveredMovie.genre_ids).map((genre, index) => (
                        <span key={index} className="border-white rounded-md bg-blue-800 text-white p-1 mr-1">
                          {genre}
                        </span>
                      ))}</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
