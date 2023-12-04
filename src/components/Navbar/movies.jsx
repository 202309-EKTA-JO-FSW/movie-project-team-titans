import Link from "next/link"
import React from "react"
function Movies() {
  return (
    <div className="movies relative justify-center text-left mx-center">
       <Link to="/One-Movie?category=Top Rated">
        <option
          className="  my-2  mx-1 rounded-2xl px-5 active:bg-gray-600  hover:bg-gray-600"
          value="Top Rate"
        >
          Top Rated
        </option>
      </Link>

      <Link to="/One-Movie?category=Popular">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Popular"
        >
          Popular
        </option>
      </Link>
      <Link to="/One-Movie?category=Trending">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Trending"
        >
          Trending
        </option>
      </Link>
      <Link to="/One-Movie?category=Now Playing">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Now Playing"
        >
          Now Playing
        </option>
      </Link>
      <Link to="/One-Movie?category=Upcoming">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Upcoming"
        >
          Upcoming
        </option>
      </Link>
    </div>
  )
}

export default Movies
