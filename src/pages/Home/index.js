import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/solid'; 
import Link from 'next/link';

export default function HomePage() {
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  const images = [
    "https://images4.alphacoders.com/134/1342682.jpeg",
    "https://images2.alphacoders.com/132/1320087.jpeg",
    "https://images3.alphacoders.com/133/1334629.jpg",
    "https://images4.alphacoders.com/132/1323605.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesToDisplay = moviesTrending.slice(startIndex, endIndex);

  const totalPages = Math.ceil(moviesTrending.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <a
          key={i}
          className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
            i === currentPage ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </a>
      );
    }

    return pageNumbers;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <main>
      <div>
        <Navbar />
        <div className='flex justify-center'>
          <div className="MovieSlider relative object-scale-down" style={{ width: '1103px', height: '400px'}}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={index}
                className={`absolute w-full h-full ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500 rounded-br-3xl rounded-bl-3xl`}
              />
            ))}
          </div>
        </div>
        <br />
        <div className='mt-8 border-t border-gray-100 pt-8 ml-20 mr-20'></div>
        <div className='ml-20 mb-10 text-2xl'><h1>Trending Movies</h1></div>
        <div className='lg:px-30 md:px-40 sm:px-30 xs:px-5 relative mb-10'>
          <div className="grid justify-items-center items-center lg:grid-cols-4 lg:gap-3 md:grid-cols-3 md:gap-2 sm:grid-cols-2 sm:gap-2 xs:grid-cols-1 xs:gap-2">
            {moviesTrending.map((movie) => (
              <Link key={movie.id} href={{ pathname: '/One-Movie', query: { id: movie.id } }} ><li
                key={movie.id}
                className="list-none relative"
                onMouseEnter={() => setHoveredMovie(movie)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                
              <div className="relative rounded-md p-4">
              <div className="absolute top-0 left-0 bg-yellow-500 p-2 rounded-tl-3xl  rounded-br-md flex items-center">
                <StarIcon className="w-6 h-6 text-white" />
                <span className="text-white ml-2 font-bold">{movie.vote_average.toFixed(1)}</span>
              </div>
             
                <div>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-3xl p-0" />
                </div>
              </div>
            <div className="relative">
      </div>

                
      {hoveredMovie && hoveredMovie.id === movie.id && (
  <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-gray-800 bg-opacity-75 flex flex-col items-center pt-10 pr-5 pl-5 ">
    <div className="text-white text-center">
      <p className='self-start text-2xl mb-8'>{hoveredMovie.title}</p>
      <p>Language: {hoveredMovie.original_language === 'en' ? 'English' : hoveredMovie.original_language === 'hi' ? 'Hindi' : hoveredMovie.original_language === 'ja' ? 'Japanese' : ''}</p>
      <p className='p-3'>{getGenreNames(hoveredMovie.genre_ids).map((genre, index) => (
        <span key={index} className="flex justify-center border-white rounded-3xl bg-blue-900 text-white pt-1 pb-1 m-2">
          {genre}
        </span>
      ))}
      </p>
    </div>
  </div>
)}

            </li></Link>
            ))}
          </div>
        </div>
        <nav aria-label="Page navigation example" className='flex justify-center my-5'>
  <ul className="inline-flex -space-x-px text-white h-10 ">
    <li>
      <a
        href="#"
        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-[#276060] border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handlePrevPage}
      >
        Previous
      </a>
    </li>
    {renderPageNumbers()}
    <li>
      <a
        href="#"
        className="flex items-center justify-center px-4 h-10 leading-tight text-[#276060] border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleNextPage}
      >
        Next
      </a>
    </li>
  </ul>
</nav>

        <Footer />
      </div>
    </main>
  );
}
