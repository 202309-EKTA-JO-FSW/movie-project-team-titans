import React from "react"
import Link from "next/link"

function MoviesLink() {
  return (
    <div className="movies relative justify-center text-left mx-center">
      {" "}
      <div
        className="  my-2  mx-1 rounded-2xl px-5 active:bg-gray-600  hover:bg-gray-600"
        value="Top Rate"
      >
        <Link href={`/Movies?category=Top Rated`}>Top Rated</Link>
      </div>
      <Link href={`/Movies?category=Popular`}>
        {" "}
        <div
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Popular"
        >
          Popular
        </div>
      </Link>
      <Link href={`/Movies?category=Trending`}>
        {" "}
        <div
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Trending"
        >
          Trending
        </div>
      </Link>
      <Link href={`/Movies?category=Now Playing`}>
        <div
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Now Playing"
        >
          Now Playing
        </div>
      </Link>
      <Link href={`/Movies?category=Upcoming`}>
        <div
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Upcoming"
        >
          Upcoming
        </div>
      </Link>
    </div>
  )
}

export default MoviesLink
