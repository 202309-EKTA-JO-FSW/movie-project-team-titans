import React from "react";
import Link from "next/link";

function MoviesLink() {
  return (
    <div className="movies relative justify-center text-left mx-center">
      <Link href={`/Movies?category=Top Rated`}>
        <div className="my-2 mx-1 rounded-2xl px-5 active:bg-gray-600  hover:bg-gray-600">
          Top Rated
        </div>
      </Link>
      <Link href={`/Movies?category=Popular`}>
        <div className="my-2 mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600">
          Popular
        </div>
      </Link>
      <Link href={`/Movies?category=Trending`}>
        <div className="my-2 mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600">
          Trending
        </div>
      </Link>
      <Link href={`/Movies?category=Now Playing`}>
        <div className="my-2 mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600">
          Now Playing
        </div>
      </Link>
      <Link href={`/Movies?category=Upcoming`}>
        <div className="my-2 mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600">
          Upcoming
        </div>
      </Link>
    </div>
  );
}

export default MoviesLink;
