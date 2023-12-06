import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { StarIcon } from '@heroicons/react/solid'; 

export default function OneMoviePage() {
  const [oneMovie, setOneMovie] = useState({});
  const [overview, setOverview] = useState('');
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [director, setDirector] = useState({});
  const [actors, setActors] = useState([]);
  const [trailer, setTrailer] = useState({});
  const scrollContainerRef = useRef(null);
  const [hoveredRelatedMovie, setHoveredRelatedMovie] = useState(null);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchOneMovie = async () => {

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI',
        },
      };

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/1075794?language=en-US',
          options
        );
        const data = await response.json();
        setOneMovie(data);

        const creditsResponse = await fetch(
          'https://api.themoviedb.org/3/movie/1075794/credits?language=en-US',
          options
        );
        const creditsData = await creditsResponse.json();

        const directorData = creditsData.crew.find(person => person.known_for_department === 'Directing');
        setDirector({
          name: directorData?.original_name || '',
          profile_path: directorData?.profile_path || '',
        });

        const actorsData = creditsData.cast
          .filter(person => person.known_for_department === 'Acting' && person.profile_path)
          .slice(0, 5)
          .map(actor => ({
            name: actor.original_name,
            profile_path: actor.profile_path,
          }));
        setActors(actorsData);

        const overviewResponse = await fetch(
          'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
          options
        );
        const overviewData = await overviewResponse.json();
        setOverview(overviewData.results[0]?.overview || '');

        const relatedMoviesResponse = await fetch(
            'https://api.themoviedb.org/3/movie/1075794/similar?language=en-US&page=1',
            options
          );
          const relatedMoviesData = await relatedMoviesResponse.json();
          const simplifiedRelatedMovies = relatedMoviesData.results.map(movie => ({
            title: movie.title,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
          }));
          setRelatedMovies(simplifiedRelatedMovies || []);
          setVisibleMovies(simplifiedRelatedMovies.slice(0, 4));  

        const trailersResponse = await fetch(
          'https://api.themoviedb.org/3/movie/1075794/videos?language=en-US',
          options
        );
        const trailersData = await trailersResponse.json();

        const firstTrailer = trailersData.results[0] || {};
        setTrailer(firstTrailer);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchOneMovie();
  }, []);


  const handleNext = () => {
    setStartIndex(prevIndex => prevIndex + 4);
    setVisibleMovies(relatedMovies.slice(startIndex, startIndex + 4));
  };
  
  const handlePrev = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - 4, 0));
    setVisibleMovies(relatedMovies.slice(startIndex - 4, startIndex));
  };

  return (
    <div>
      <Navbar />
      <div className='mt-10 lg:px-5 md:px-5 sm:px-5 xs:px-5'>
        <h3 className="text-3xl text-white font-bold mx-auto p-2 text-center bg-[#276060] rounded-3xl mx-40">
          {oneMovie.title || 'Unknown'}
        </h3>
        <div className="flex flex-col my-10 justify-items-center items-left">
          <li key={oneMovie.id} className="list-none rounded-md relative ">
            <div className="flex mx-auto justify-center bg-[#276060] pt-8 pb-8 pl-6 pr-5 rounded-3xl mx-40">
              <div className="relative rounded-md p-4">
                <div className="absolute top-0 left-0 bg-yellow-500 p-2 rounded-tl-3xl  rounded-br-md flex items-center">
                  <StarIcon className="w-6 h-6 text-white" />
                  <span className="text-white ml-2 font-bold">
                    {oneMovie.vote_average ? oneMovie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`}
                alt={oneMovie.name}
                className="h-80 object-cover rounded-3xl"
              />
              <div className="ml-5">
                <p className="mb-2 mt-3">Language: {oneMovie.original_language === 'en' ? 'English' : oneMovie.original_language === 'hi' ? 'Hindi' :
                  oneMovie.original_language === 'ja' ? 'Japanese' : oneMovie.original_language === 'ar' ? 'Arabic' :
                    oneMovie.original_language === 'mn' ? 'Mongolian' : oneMovie.original_language === 'ko' ? 'Korean' :
                      oneMovie.original_language === 'it' ? 'Italian' : oneMovie.original_language === 'fr' ? 'French' :
                        oneMovie.original_language === 'zh' ? 'Zhuang' : ''}</p>
                <Link href={``}>
                  {/* <button className="mt-5 px-8 py-3 rounded-full bg-[#276060] hover:bg-[#1f4d4d] font-bold duration-300" href="#">About Actor</button> */}
                </Link>
                <p className="mb-2">Relase Date: {oneMovie.release_date}</p>
                <p className="mb-2">Number of votes: {oneMovie.vote_count}</p>
                <p className="mb-2">Run Time: {oneMovie.runtime}</p>
                <p className="mb-12">Director's Name: {director.name}</p>
                <p className="mb-2">Overview: {overview}</p>
              </div>
            </div>
  
            {/* Render trailer */}
            {trailer.key && (
              <div className="my-5">
                <div className='mt-8 border-t border-gray-100 pt-8 ml-20 mr-20'></div>
                <div className='ml-20 mb-10 text-2xl'><h1>Trailer</h1></div>
                <iframe
                    title={trailer.name}
                    className="mx-auto w-full h-96 lg:pl-40 lg:pr-40 rounded-3xl"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>

              </div>
            )}
  
            {/* Render related movies */}
            <div className="my-5">
              <div className='mt-8 border-t border-gray-100 pt-8 ml-20 mr-20'></div>
              <div className='ml-20 mb-10 text-2xl'><h1>Related Movies</h1></div>
              <div className="lg:px-30 md:px-40 sm:px-30 xs:px-5 relative mb-10">
                <div
                  ref={scrollContainerRef}
                  className="grid justify-items-center items-center lg:grid-cols-4 lg:gap-3 md:grid-cols-3 md:gap-2 sm:grid-cols-2 sm:gap-2 xs:grid-cols-1 xs:gap-2"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {visibleMovies.map((oneMovie, index) => (
                    <Link key={index} href={`/One-Movie`} className="list-none rounded-md group relative my-4">
                      <div
                        className="list-none relative"
                        onMouseEnter={() => setHoveredRelatedMovie(oneMovie)}
                        onMouseLeave={() => setHoveredRelatedMovie(null)}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`}
                          alt={oneMovie.title}
                          className="h-80 object-cover rounded-3xl"
                        />
                        <div className="absolute top-0 left-0 bg-yellow-500 p-2 rounded-tl-3xl  rounded-br-md flex items-center">
                          <StarIcon className="w-6 h-6 text-white" />
                          <span className="text-white ml-2 font-bold">
                            {oneMovie.vote_average.toFixed(1)}
                          </span>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col font-bold text-center justify-center items-center bg-[#142e2edb] rounded-3xl opacity-0 group-hover:opacity-100 duration-500 pt-10 pr-5 pl-5">
                    <div className="text-white text-center">
                        <p className="self-start text-2xl mb-8">
                        {oneMovie.title}
                        </p>
                    </div>
                    </div>

                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={handlePrev}
                  className="absolute top-0 left-0 mt-10 ml-2 text-white"
                  disabled={startIndex === 0}
                >
                  &#9665;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-0 right-0 mt-10 mr-2 text-white"
                  disabled={startIndex + 4 >= relatedMovies.length}
                >
                  &#9655;
                </button>
              </div>
            </div>
  
            {/* Render director and actors */}
            <div className='mt-8 border-t border-gray-100 pt-8 ml-20 mr-20'></div>
              <div className='ml-20 mb-10 text-2xl'><h1>Director & Actors</h1></div>
              
              <p className="ml-20 mb-5 text-1xl">Director: {director.name}</p>
                <div className="list-none rounded-md group relative">
                <img
                    src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                    className="order-1 w-40 object-cover rounded-3xl ml-24"
                />
                </div>

            <p className="ml-20 mr-20 mt-10">Actors:
            <div className="grid my-5 justify-items-center items-center lg:grid-cols-5 lg:gap-0 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1 xs:grid-cols-1 xs:gap-3">
                {actors.map(actor => (
                  <li key={actor.id} className="list-none rounded-md group relative my-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      className="order-1 h-60 object-cover rounded-3xl"
                    />
                    <div className="absolute top-0 left-0 w-full h-0 flex flex-col font-bold text-center justify-center items-center bg-[#142e2edb] rounded-3xl opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                  <h1 className="text-2xl text-white text-center px-2">{actor.name}</h1>
                    <Link href={`/One-Actor`}>
                    <button className="mt-5 px-4 py-1 rounded-full bg-[#276060] hover:bg-[#1f4d4d] font-bold duration-300" href="#">About Actor</button>
                  </Link>
                </div>
                  </li>
                ))}
              </div>
            </p>
            


            <div className='mt-8 border-t border-gray-100 pt-8 ml-20 mr-20'></div>
              <div className='ml-20 mb-10 text-2xl'><h1>Production Companies</h1></div>
              <p className="text-center">
              <ul className="flex tex-center justify-center mt-5 bg-[#276060] lg:mx-40 rounded-3xl">
                {oneMovie.production_companies && oneMovie.production_companies.length > 0 ? (
                  oneMovie.production_companies.map(company => (
                    <li key={company.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                        className="order-1 lg:w-90 lg:h-20 object-cover lg:px-10 lg:my-5"
                      />
                    </li>
                  ))
                ) : (
                  <li>No production companies available</li>
                )}
              </ul>
            </p>
          </li>
          
        </div>
      </div>
      <Footer />
    </div>
  );  
}
