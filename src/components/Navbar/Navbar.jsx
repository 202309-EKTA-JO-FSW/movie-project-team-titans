import React, { useState, useEffect, useRef } from "react"
import MoviesLink from "./movies"
import ActorsLink from "./actors"
import Search from "./search"
import Genres from "./genres"
import Link from "next/link"

function Navbar() {
  const [moviesDropdownVisible, setMoviesDropdownVisible] = useState(false)
  const [genresDropdownVisible, setGenresDropdownVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  const moviesListRef = useRef(null)
  const genresListRef = useRef(null)

  const handleClickOutside = (event) => {
    if (
      moviesListRef.current &&
      !moviesListRef.current.contains(event.target)
    ) {
      setMoviesDropdownVisible(false)
    }
    if (
      genresListRef.current &&
      !genresListRef.current.contains(event.target)
    ) {
      setGenresDropdownVisible(false)
    }
  }

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-[#142E2E]">
      {windowWidth <= 480 ? (
        <div>
          <div className="grid grid-cols-[max-content_1fr] justify-center items-center pt-4 pl-4 pr-4 text-white">
            <Link href={`/Home`}>
              {" "}
              <img
                src="/Logo.png"
                className="Logo  w-36 h-15 mr-2"
                alt="Logo"
              />
            </Link>

            <div className="mx-auto z-50">
              <Search />
            </div>
          </div>

          <div className="grid grid-cols-3  text-center p-3 mx-auto">
            <div className="group inline-block  relative">
              <button
                className="text-white focus:outline-none bg-transparent  hover:opacity-75"
                onClick={() => setMoviesDropdownVisible(!moviesDropdownVisible)}
              >
                Movies
              </button>
              {moviesDropdownVisible && (
                <div className="border-solid border-2 z-50 border-white absolute  bg-[#142121] text-white mt-6 rounded-xl">
                  <MoviesLink />
                </div>
              )}
            </div>

            <div className="group inline-block relative">
              <button
                className=" hover:opacity-75 text-white focus:outline-none"
                onClick={() => setGenresDropdownVisible(!genresDropdownVisible)}
              >
                Genres
              </button>
              {genresDropdownVisible && (
                <div
                  className="border-solid border-2  z-50 border-white absolute bg-[#142121] text-white mt-6 rounded-xl"
                  ref={genresListRef}
                >
                  <Genres />
                </div>
              )}
            </div>
            <div className=" hover:opacity-75">
              <ActorsLink />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-around p-4 text-white">
          <div>
            <Link href={`/Home`}>
              <img src="/Logo.png" className="Logo w-48 h-15" alt="Logo" />
            </Link>
          </div>

          <Search />

          <div className="group inline-block relative" ref={moviesListRef}>
            <button
              className="text-white hover:opacity-75 bg-transparent"
              onClick={() => setMoviesDropdownVisible(!moviesDropdownVisible)}
            >
              Movies
            </button>
            {moviesDropdownVisible && (
              <div className="border-solid border-2 z-50 border-white absolute bg-[#142121] text-white mt-6 rounded-xl">
                <MoviesLink />
              </div>
            )}
          </div>
          <div className="group inline-block relative" ref={genresListRef}>
            <button
              className="text-white hover:opacity-75 focus:outline-none"
              onClick={() => setGenresDropdownVisible(!genresDropdownVisible)}
            >
              Genres
            </button>
            {genresDropdownVisible && (
              <div className="border-solid border-2 z-50 border-white absolute bg-[#142121] text-white mt-6 rounded-xl">
                <Genres />
              </div>
            )}
          </div>
          <div className="hover:opacity-75">
            <ActorsLink />
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
