import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [combinedResults, setCombinedResults] = useState([]);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target) && inputRef.current !== event.target) {
      setCombinedResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchResults = async () => {
    const movieOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI',
      },
    };
    const actorOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI',
      },
    };
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`,
        movieOptions
      );

      const actorResponse = await fetch(
        `https://api.themoviedb.org/3/person/popular?query=${searchText}&language=en-US&page=1`,
        actorOptions
      );
      const movieData = await movieResponse.json();
      const actorData = await actorResponse.json();
      const filteredActors = actorData.results.filter(
        (actor) => actor.name.toLowerCase() === searchText.toLowerCase()
      );

      const combinedResults = [
        ...movieData.results.map((movie) => ({ type: 'movie', ...movie })),
        ...filteredActors.map((actor) => ({ type: 'actor', ...actor })),
      ];
      setCombinedResults(combinedResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputClick = async () => {
    if (searchText.trim().length >= 3) {
      await fetchResults();
    }
  };

  useEffect(() => {
    if (searchText.trim().length >= 3) {
      fetchResults();
    } else {
      setCombinedResults([]);
    }
  }, [searchText]);

  return (
    <div className="relative">
      <form>
  <div className="relative flex items-center left-5 bg-gray-800">
    <FaSearch className="absolute left-4 text-gray-500" />
    <input
      ref={inputRef}
      type="text"
      name="search"
      placeholder="Find Movies or Actors..."
      className={`pl-12 pr-0.2 py-1 rounded-2xl focus:outline-none w-96 border border-gray-300 bg-gray-800 left-10 text-white`}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onClick={handleInputClick}
    />
  </div>
</form>

      {combinedResults.length > 0 && (
        <div ref={listRef} className="absolute mt-1 bg-gray-900 rounded-md shadow-md w-96">
          {combinedResults.slice(0, 5).map((result) => (
  <div key={result.id} className="p-2 text-white flex items-center space-x-4">
    {result.type === 'movie' ? (
      <div className="flex-shrink-0">
        <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title} className="w-14 h-20" />
      </div>
    ) : result.type === 'actor' ? (
      <div className="flex-shrink-0">
        <img src={`https://image.tmdb.org/t/p/w500${result.profile_path}`} alt={result.name} className="w-14 h-20" />
      </div>
    ) : null}
    <div>
      <p className="font-bold">{result.type === 'movie' ? result.title : result.name}</p>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
}

export default Search;
