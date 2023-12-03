import React, { useState, useEffect } from "react"
import Movies from "./movies"
import ActorsLink from "./actors"
import Search from "./search"
import Genres from "./genres"

function Navbar() {
  const [moviesDropdownVisible, setMoviesDropdownVisible] = useState(false)
  const [genresDropdownVisible, setGenresDropdownVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)

      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <div className="bg-gray-800">
      {windowWidth <= 480 ? (
        <div>
          <div className="grid grid-cols-2  grid-cols-[max-content_1fr] justify-center items-center pt-4 pl-4 pr-4 text-white">
            <img src="/logo.png" className="logo  w-15 h-8" alt="logo" />
            <div className="mx-auto">
              <Search />
            </div>
          </div>
          <div className="grid grid-cols-3 text-center p-3 mx-auto">
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
        </div>
      ) : (
        // Larger screen content goes here
        // ...
        // ...
        //
        //
        //
        //
        //
        //
        //
        <div className="flex items-center justify-center justify-around p-4 text-white">
          <div>
            <img
              src="/logo.png"
              className="logo lg:w-25 lg:h-15 md:w-22 md:h-10 sm:w-18 sm:h-8 xs:w-17 xs:h-8"
              alt="logo"
            />
          </div>
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
      )}
    </div>
  )
}

export default Navbar
