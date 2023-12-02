import React, { useState } from "react";
import Movies from "./movies";
import ReactDOM from 'react-dom';
import ActorsLink from "./actors";
import Search from "./search";
import Genres from "./genres";

function Navbar() {
  const [moviesDropdownVisible, setMoviesDropdownVisible] = useState(false);
  const [genresDropdownVisible, setGenresDropdownVisible] = useState(false);

  return (
    <div className="bg-gray-800">
      <nav className="flex items-center p-2 text-white">

        <img src="/logo.png" className="w-25 h-15" alt="logo" />
        <div className="flex items-center space-x-24 justify-between p-4 text-white">

        <Search />
        <div className="group inline-block relative">
          <button
            className="text-white focus:outline-none bg-transparent"
            onClick={() => setMoviesDropdownVisible(!moviesDropdownVisible)}
            onBlur={() => setMoviesDropdownVisible(false)}
          >
            Movies
          </button>
          {moviesDropdownVisible && (
            <div className="absolute bg-gray-800 text-white p-2 mt-2 rounded-md">
              <Movies />
            </div>
          )}
        </div>

        <div className="group inline-block relative">
          <button
            className="text-white focus:outline-none"
            onClick={() => setGenresDropdownVisible(!genresDropdownVisible)}
            onBlur={() => setGenresDropdownVisible(false)}
          >
            Genres
          </button>
          {genresDropdownVisible && (
            <div className="absolute bg-gray-800 text-white p-2 mt-2 rounded-md">
              <Genres />
            </div>
          )}
        </div>
          <ActorsLink />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
