import React from "react"
import Link from "next/link"
function MoviesLink() {
  return (
    <div className="movies relative justify-center text-left mx-center">
       <Link href={`/Movies`}>
        <option
          className="  my-2  mx-1 rounded-2xl px-5 active:bg-gray-600  hover:bg-gray-600"
          value="Top Rate"
        >
          Top Rated
        </option>
      </Link>

      <Link href={`/Movies`}>
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Popular"
        >
          Popular
        </option>
      </Link>
      <Link href={`/Movies`}>
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Trending"
        >
          Trending
        </option>
      </Link>
      <Link href={`/Movies`}>
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Now Playing"
        >
          Now Playing
        </option>
      </Link>
      <Link href={`/Movies`}>
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

export default MoviesLink
