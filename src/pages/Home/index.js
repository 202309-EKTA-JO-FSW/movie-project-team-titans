import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';

export default function HomePage() {
  const [moviesTrending, setMoviesTrending] = useState([]);

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
  }, []);

  return (
    <main>
      <div>
        <Navbar />
        <br /> <br />
        <div className='lg:px-50 md:px-40 sm:px-20 xs:px-5'>
          <div className="grid justify-items-center items-center lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-2 sm:grid-cols-2 sm:gap-1 xs:grid-cols-1">
            {moviesTrending.map((movie) => (
              <li key={movie.id} className="list-none bg-gray-300 rounded-md p-4">
                <div className="rounded-md p-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-48 h-full object-cover rounded-3xl p-0"
                  />
                </div>
                <p className="mt-2 text-center text-white font-bold bg-gray-800 p-2 rounded-md">{movie.title}</p>
              </li>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
